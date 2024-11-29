import OpenAI from 'openai'
import config from 'config'
import { createReadStream } from 'fs'

class OpenAIclass {
  roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system',
  }

  constructor(apiKey) {
	  this.openai = new OpenAI({
	  	apiKey,
	  })
  }

  async chat(messages) {
    try {
		  console.log('Loading chat...')
		
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        max_tokens: 4000,
        messages,
      })
      return response.choices[0].message
    } catch (e) {
      console.log('Error while gpt chat', e.message)
    }
  }

  async transcription(filepath) {
    try {
      const response = await this.openai.audio.transcriptions.create({
        model: "whisper-1",
        file: createReadStream(filepath),
    })
      console.log('Loading audio message...',response.text)
      return response.text
    } catch (e) {
      console.log('Error while transcription', e.message)
    }
  }
}

export const openai = new OpenAIclass(config.get('OPENAI_KEY'))
