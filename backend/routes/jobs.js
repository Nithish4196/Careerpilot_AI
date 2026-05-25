import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

const router = express.Router();

const aiRankJobs = (jobsList, searchRole, searchLoc) => {
  const roleTerms = searchRole.toLowerCase().split(' ');
  const locTerm = searchLoc ? searchLoc.toLowerCase() : '';

  return jobsList.map(job => {
    let score = 50 + Math.floor(Math.random() * 10);

    const titleLower = (job.title || '').toLowerCase();
    const descLower = (job.description || '').toLowerCase();
    const locLower = (job.candidate_required_location || '').toLowerCase();

    roleTerms.forEach(term => {
      if (titleLower.includes(term)) score += 15;
      if (descLower.includes(term)) score += 5;
    });

    if (locTerm) {
      if (locLower.includes(locTerm)) score += 20;
      else if (locLower.includes('remote') || locLower.includes('anywhere') || locLower.includes('worldwide')) score += 10;
      else score -= 15;
    }

    const finalScore = Math.min(99, Math.max(15, score));
    return { ...job, matchScore: finalScore };
  });
};

router.get('/search', async (req, res) => {
  const { role, location } = req.query;

  if (!role) {
    return res.status(400).json({ error: 'Role is required' });
  }

  try {
    const encodedQuery = encodeURIComponent(role);
    const encodedLoc = encodeURIComponent(location || 'Worldwide');

    // --- 1. Fetch Jobicy ---
    const fetchJobicy = axios.get('https://jobicy.com/api/v2/remote-jobs')
      .then(response => {
        let jobs = response.data.jobs || [];
        const roleLower = role.toLowerCase();
        jobs = jobs.filter(j => j.title.toLowerCase().includes(roleLower) || j.companyName.toLowerCase().includes(roleLower));
        
        return jobs.map(job => ({
          id: `jobicy-${job.id}`,
          company_name: job.companyName,
          company_logo: job.companyLogo,
          title: job.title,
          job_type: (job.jobType && job.jobType.length > 0) ? job.jobType[0] : 'Remote',
          candidate_required_location: job.jobGeo,
          salary: null,
          description: job.jobExcerpt || job.jobDescription.replace(/<[^>]+>/g, '').substring(0, 150) + '...',
          publication_date: job.pubDate,
          url: job.url,
          source: 'Web Search (Jobicy)'
        }));
      }).catch(err => { console.error('Jobicy Error:', err.message); return []; });

    // --- 2. Fetch Remotive ---
    const fetchRemotive = axios.get(`https://remotive.com/api/remote-jobs?search=${encodedQuery}&limit=50`)
      .then(response => {
        let jobs = response.data.jobs || [];
        return jobs.map(job => ({
          ...job,
          id: `remotive-${job.id}`,
          source: 'Web Search (Remotive)'
        }));
      }).catch(err => { console.error('Remotive Error:', err.message); return []; });

    // --- 3. Fetch Arbeitnow ---
    const fetchArbeitnow = axios.get('https://arbeitnow.com/api/job-board-api')
      .then(response => {
        let jobs = response.data.data || [];
        const roleLower = role.toLowerCase();
        jobs = jobs.filter(j => j.title.toLowerCase().includes(roleLower) || j.company_name.toLowerCase().includes(roleLower));
        
        return jobs.map(job => ({
          id: `arbeitnow-${job.slug}`,
          company_name: job.company_name,
          company_logo: null,
          title: job.title,
          job_type: (job.job_types && job.job_types.length > 0) ? job.job_types[0] : (job.remote ? 'Remote' : 'Full Time'),
          candidate_required_location: job.location,
          salary: null,
          description: job.description.replace(/<[^>]+>/g, '').substring(0, 150) + '...',
          publication_date: new Date(job.created_at * 1000).toISOString(),
          url: job.url,
          source: 'Web Search (Arbeitnow)'
        }));
      }).catch(err => { console.error('Arbeitnow Error:', err.message); return []; });

    // --- 4. Fetch The Muse ---
    const fetchTheMuse = axios.get('https://www.themuse.com/api/public/jobs?page=1')
      .then(response => {
        let jobs = response.data.results || [];
        const roleLower = role.toLowerCase();
        jobs = jobs.filter(j => j.name.toLowerCase().includes(roleLower) || (j.company && j.company.name.toLowerCase().includes(roleLower)));
        
        return jobs.map(job => ({
          id: `themuse-${job.id}`,
          company_name: job.company?.name || 'Unknown',
          company_logo: null,
          title: job.name,
          job_type: job.type === 'external' ? 'Full Time' : job.type,
          candidate_required_location: job.locations?.length > 0 ? job.locations[0].name : 'Flexible',
          salary: null,
          description: job.contents.replace(/<[^>]+>/g, '').substring(0, 150) + '...',
          publication_date: job.publication_date,
          url: job.refs?.landing_page || `https://www.themuse.com/jobs/${job.company?.short_name}/${job.short_name}`,
          source: 'Web Search (The Muse)'
        }));
      }).catch(err => { console.error('The Muse Error:', err.message); return []; });

    // --- 5. Backend Scraping: LinkedIn ---
    const fetchLinkedIn = axios.get(`https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${encodedQuery}&location=${encodedLoc}&start=0`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const jobCards = [];

        $('.base-card').each((index, card) => {
          const title = $(card).find('.base-search-card__title').text().trim() || 'Job Opportunity';
          const company = $(card).find('.base-search-card__subtitle').text().trim() || 'Unknown Company';
          const loc = $(card).find('.job-search-card__location').text().trim() || location;
          let url = $(card).find('.base-card__full-link').attr('href') || '';
          if (url && url.startsWith('/')) url = 'https://www.linkedin.com' + url;
          const logo = $(card).find('img').attr('src') || null;

          if (url) {
            jobCards.push({
              id: `backend-linkedin-${Date.now()}-${index}`,
              company_name: company,
              company_logo: logo,
              title: title,
              job_type: 'Full Time',
              candidate_required_location: loc,
              salary: null,
              description: 'Click to view the full job posting and apply directly on the company page via LinkedIn.',
              publication_date: new Date().toISOString(),
              url: url,
              source: 'Web Search (LinkedIn)'
            });
          }
        });
        return jobCards;
      }).catch(err => { console.error('LinkedIn Error:', err.message); return []; });

    const results = await Promise.all([fetchJobicy, fetchRemotive, fetchArbeitnow, fetchTheMuse, fetchLinkedIn]);
    let allJobs = results.flat();

    // Location Filtering
    if (location && location.trim() !== '') {
      const locLower = location.toLowerCase().trim();
      allJobs = allJobs.filter(job => {
        if (!job.candidate_required_location) return false;
        const reqLoc = job.candidate_required_location.toLowerCase();
        return reqLoc.includes(locLower) || reqLoc.includes('remote') || reqLoc.includes('anywhere') || reqLoc.includes('worldwide');
      });
    }

    // AI Ranking
    let rankedJobs = aiRankJobs(allJobs, role, location);
    rankedJobs.sort((a, b) => b.matchScore - a.matchScore);

    res.json({ jobs: rankedJobs.slice(0, 50) });

  } catch (error) {
    console.error('Server error fetching jobs:', error);
    res.status(500).json({ error: 'Internal server error while aggregating jobs' });
  }
});

export default router;
