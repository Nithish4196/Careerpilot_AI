import { NextResponse } from"next/server";

export async function POST(request: Request) {
  try {
    // In a real application, you would:
    // 1. Get the uploaded file or its URL from the request
    // 2. Extract text using a library like pdf-parse
    // 3. Send the text to an LLM (Gemini, OpenAI, etc.) with the provided system prompt
    
    const body = await request.json().catch(() => ({}));
    const targetRole = body.targetRole || "your target role";
    
    // For now, we simulate the AI analysis delay and return a mock response
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const baseScore = Math.floor(Math.random() * 40) + 55; // 55 to 95
    const allKeywords = ["Docker","CI/CD","Agile","GraphQL","TypeScript","AWS","Kubernetes","Python","System Design","React"];
    const randomKeywords = allKeywords.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const mockAnalysis = {
      atsScore: baseScore,
      strengths: ["Strong technical skills section","Clear chronological experience","Good use of action verbs"],
      weaknesses: [`Missing quantified achievements for a ${targetRole} position`,"Summary is too generic","Formatting could be more consistent"],
      missingKeywords: randomKeywords,
      sectionScores: {
        summary: Math.min(100, baseScore - 10),
        experience: Math.min(100, baseScore + 5),
        skills: Math.min(100, baseScore + 10),
        education: 100,
        formatting: Math.min(100, baseScore - 5)
      },
      improvementTips: [
        `Add measurable metrics to your most recent role to better align with ${targetRole} expectations.`,
        `Include ${randomKeywords[0]} in your skills to match modern ${targetRole} roles.`,
        `Tailor your professional summary specifically to a ${targetRole} job description.`,
        "Ensure all bullet points start with strong action verbs."
      ],
      parsedData: {
        personalInfo: {
          fullName: 'John Uploaded',
          jobTitle: targetRole,
          email: 'john.uploaded@example.com',
          phone: '(555) 987-6543',
          location: 'New York, NY',
          summary: `Experienced professional with a strong background in technology. Currently applying for ${targetRole} roles.`
        },
        experience: [
          {
            id: 'mock_exp_1',
            company: 'Uploaded Tech Corp',
            role: `Junior ${targetRole}`,
            date: 'Mar 2022 - Present',
            description: 'Developed and maintained key features for the main product line. Collaborated with cross-functional teams.'
          }
        ],
        education: [
          {
            id: 'mock_edu_1',
            school: 'State University',
            degree: 'B.S. in Computer Science',
            date: '2018 - 2022'
          }
        ],
        skills: ['JavaScript', 'React', 'Node.js', randomKeywords[1], randomKeywords[2]]
      }
    };

    return NextResponse.json(mockAnalysis);
  } catch (error) {
    console.error("Error parsing resume:", error);
    return NextResponse.json({ error:"Failed to parse resume" }, { status: 500 });
  }
}
