import dotenv from 'dotenv';
import { AssemblyAI } from 'assemblyai';
import fs from 'node:fs/promises';

dotenv.config();

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY 
});

const audioFile = './Fuel.mp3'
const outputFile = 'result.txt'; 

const transcribeAudioAndWriteToFile = async (audioFilePath, outputFilePath) => {
  console.log(`Starting transcription for: ${audioFilePath}`);
  try {
    const params = {
      audio: audioFilePath
    };

    const transcript = await client.transcripts.transcribe(params);

    if (transcript.status === 'error') {
      console.error(`Transcription failed: ${transcript.error}`);
      process.exit(1); 
    }

    await fs.writeFile(outputFilePath, transcript.text, 'utf-8');
    console.log(`Transcription successfully saved to: ${outputFilePath}`);

  } catch (error) {
    console.error("An error occurred during transcription or file writing:", error);
    process.exit(1); 
  }
};

transcribeAudioAndWriteToFile(audioFile, outputFile);
