import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from"firebase/firestore";
import { db } from"./firebase";

export type ActivityCategory =
  |"resumeEdits"
  |"jobsApplied"
  |"coursesStudied"
  |"mockInterviews"
  |"projectsWorked"
  |"aiChatMessages"
  |"roadmapTasksCompleted";

/**
 * Logs a specific activity action to Firestore for the given user.
 * Increments the total actions count and the specific category count for today.
 */
export const logActivity = async (uid: string, category: ActivityCategory) => {
  if (!uid) return;

  try {
    // Get today's date in local timezone as YYYY-MM-DD
    const today = new Date();
    const tzOffset = today.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = new Date(today.getTime() - tzOffset).toISOString().split('T')[0];
    
    const docRef = doc(db, `users/${uid}/activityLog`, localISOTime);
    
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Document exists, increment the category and total actions
      await updateDoc(docRef, {
        actions: increment(1),
        [`breakdown.${category}`]: increment(1),
        lastUpdated: serverTimestamp(),
      });
    } else {
      // Create new document for today
      await setDoc(docRef, {
        date: localISOTime,
        actions: 1,
        breakdown: {
          resumeEdits: category ==="resumeEdits" ? 1 : 0,
          jobsApplied: category ==="jobsApplied" ? 1 : 0,
          coursesStudied: category ==="coursesStudied" ? 1 : 0,
          mockInterviews: category ==="mockInterviews" ? 1 : 0,
          projectsWorked: category ==="projectsWorked" ? 1 : 0,
          aiChatMessages: category ==="aiChatMessages" ? 1 : 0,
          roadmapTasksCompleted: category ==="roadmapTasksCompleted" ? 1 : 0,
        },
        lastUpdated: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};
