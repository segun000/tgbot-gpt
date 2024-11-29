import OpenAI from 'openai'
import config from 'config'
import { createReadStream } from 'fs'

class OpenAI {
  roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system',
  }

  constructor(apiKey) {
<<<<<<< HEAD
    const openaiclass = new OpenAIClass({
=======
    const openai = new OpenAI({
>>>>>>> parent of 897bd2a (trying to resolve)
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

<<<<<<< HEAD
export const openaiclass = new OpenAIClass(config.get('OPENAI_KEY'))
=======
export const openai = new OpenAI(config.get('OPENAI_KEY'))
>>>>>>> parent of 897bd2a (trying to resolve)
