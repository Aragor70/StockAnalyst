import BaseService from './baseService';

class LanguageService extends BaseService {

  async getLanguage(languageCode: string): Promise<any> {
    try {
      const res = await this.get('/api/language', {
        params: {
          languageCode
        }
      });
      return res
    } catch (err) {
      console.error('Failed to load language:', err);
      return [];
    }
  }
}
export default LanguageService;