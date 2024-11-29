import OpenAI from 'openai'
import config from 'config'
import { createReadStream } from 'fs'

class OpenAIClass {
  roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system',
  }

  constructor(apiKey) {
    const openaiclass = new OpenAIClass({
      apiKey,
    })
  }

  async chat(messages) {
    try {
      const response = await this.openaiclass.chat.completion.create({
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
      const response = await this.openaiclass.audio.transcription.create({
        model: 'whisper-1',
        file: createReadStream(filepath),
    })
      return response.data.text
    } catch (e) {
      console.log('Error while transcription', e.message)
    }
  }
}

export const openaiclass = new OpenAIClass(config.get('OPENAI_KEY'))
