import OpenAI from "openai";
import { NextResponse } from "next/server";
export async function POST(req:Request){
 try{
  const {answers,calculation}=await req.json();
  if(!process.env.OPENAI_API_KEY)return NextResponse.json({error:"AI is not configured. Add OPENAI_API_KEY in deployment settings."},{status:503});
  const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  const out=await client.chat.completions.create({model:process.env.OPENAI_MODEL||"gpt-4o-mini",temperature:.25,response_format:{type:"json_object"},messages:[
   {role:"system",content:"You are an educational retirement-planning explainer for Wealth With Aviral. Return JSON keys headline, summary, strengths, risks, questionsToThinkAbout, next30Days, caveats. Arrays must contain strings. Explain but do not recalculate or alter supplied numbers. Do not recommend specific securities, funds, products, trades, or asset allocations. Never promise returns. Identify missing information and assumptions. This is educational information, not personalised investment, tax, legal or financial advice. Lifestyle reflection is not a validated psychological score."},
   {role:"user",content:JSON.stringify({answers,calculation})}
  ]});
  return NextResponse.json({report:JSON.parse(out.choices[0]?.message?.content||"{}")});
 }catch{return NextResponse.json({error:"Could not generate report. Check API configuration and try later."},{status:500});}
}