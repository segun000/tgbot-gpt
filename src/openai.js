import OpenAI from 'openai'
import config from 'config'
import { createReadStream } from 'fs'

class OpenAIclass {
  roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system',
  }



  async chat(messages) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
      })
      return response.choices[0].message
    } catch (e) {
      console.log('Error while gpt chat', e.message)
    }
  }

  async transcription(filepath) {
    try {
      const response = await this.openai.audio.transcription.create({
        model: 'whisper-1',
        file: createReadStream(filepath),
    })
      return response.data.text
    } catch (e) {
      console.log('Error while transcription', e.message)
    }
  }
}

export const openaiVar = new OpenAIclass(config.get('OPENAI_KEY'))
