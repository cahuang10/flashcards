import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const systemPrompt = `Generate a flashcard with a question or term on one side and the answer or 
explanation on the other. Ensure the content is clear, concise, and focused on key concepts. Tailor the flashcards to 
the user's specified subject or topic, emphasizing areas that require reinforcement.


Only respond with valid JSON. Return in the following JSON format { "flashcards":[{"front": str, "back": str}],}
`;

// Initialize the Groq API client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    // Parse the request body
    const { text } = await req.json();
    if (!text) {
      return new Response("System prompt and user text are required", {
        status: 400,
      });
    }

    // Make the completion request using Groq
    const result = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
      model: "llama3-8b-8192",
    });


    // Parse and return the flashcards JSON format
    const flashcards = JSON.parse(result.choices[0]?.message?.content || "{}");
    return NextResponse.json({ flashcards: flashcards.flashcards });
  } catch (err) {
    // Log the error for debugging
    console.error("Error occurred:", err);

    // Return a 500 response with the error message
    return new Response(`Internal Server Error: ${err.message || err}`, {
      status: 500,
    });
  }
}