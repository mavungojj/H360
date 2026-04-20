import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class AiService {
  private ai: GoogleGenAI;
  private readonly logger = new Logger(AiService.name);

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    this.logger.log(`GEMINI_API_KEY: ${apiKey ? 'encontrada' : 'NAO encontrada'}`);
    this.ai = new GoogleGenAI({ apiKey: apiKey! });
  }

  private async generate(prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });
    return response.text ?? '';
  }

  async analyzeSymptons(symptoms: string, patientHistory?: string) {
    const prompt = `
Es um assistente medico especializado a apoiar medicos em Angola.
Analisa os seguintes sintomas e sugere possiveis diagnosticos.

Sintomas: ${symptoms}
${patientHistory ? `Historico medico: ${patientHistory}` : ''}

Responde em portugues com:
1. Possiveis diagnosticos (do mais ao menos provavel)
2. Exames recomendados
3. Observacoes importantes

Nota: Esta e apenas uma sugestao de apoio ao medico, nao substitui o diagnostico clinico.
    `;
    return this.generate(prompt);
  }

  async analyzeExamResult(examType: string, result: string, patientHistory?: string) {
    const prompt = `
Es um assistente medico especializado a apoiar medicos em Angola.
Analisa o seguinte resultado de exame e fornece uma interpretacao.

Tipo de exame: ${examType}
Resultado: ${result}
${patientHistory ? `Historico medico: ${patientHistory}` : ''}

Responde em portugues com:
1. Interpretacao do resultado
2. Se os valores estao normais ou alterados
3. Recomendacoes para o medico

Nota: Esta e apenas uma sugestao de apoio ao medico, nao substitui o diagnostico clinico.
    `;
    return this.generate(prompt);
  }

  async summarizeHistory(medicalHistory: string) {
    const prompt = `
Es um assistente medico especializado a apoiar medicos em Angola.
Faz um resumo estruturado do seguinte historico medico do paciente.

Historico: ${medicalHistory}

Responde em portugues com um resumo claro e organizado dos pontos mais importantes.
    `;
    return this.generate(prompt);
  }
}