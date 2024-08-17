import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given content. Follow these guidelines below:

* Create clean and concise question for the front of the flashcard.
* Include a variety of question types, such as definitions, examples, comparisons, or applications.
* Ensure that each flashcard focuses on a single concept or a piece of information.
* Use simple language to make the flashcards accessible to wild range of learners.
* Avoid overly complex or ambiguous phrasing in both questions and answers.
* When appropriate, use mnemonics or memory aids to help reinforce the information.
* Tailor the difficulty level of the flashcards to the user's specified preferences.
* If given a body of text, extract the most important and relevant information for the flashcards.
* Aim to create a balanced set of flashcards that covers the topic comprehensively.
* Only generate 12 flashcards.
* Only respond with valid JSON.

The goal is to facilitate effective learning and retention of information through these flashcards.


Only respond with valid JSON. Return in the following JSON format:
 { 
    "flashcards":[
      {
        "front": str,
        "back": str
      }
    ]
}
`;

// Initialize the Groq API client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {

  // Parse the request body
  const { text } = await req.json();
  if (!text) {
    return new Response("User text is required", {
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
  console.log("Raw result:", result.choices[0]?.message?.content );
  
  // Parse and return the flashcards JSON format
  const flashcards = JSON.parse(result.choices[0]?.message?.content || "{}");
  return NextResponse.json(flashcards.flashcards);
}