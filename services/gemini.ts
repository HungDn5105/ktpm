
import { GoogleGenAI } from "@google/genai";
import { FeeItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Phân tích dữ liệu thu phí để đưa ra nhận xét tổng quan
 */
export const analyzeFeesWithAI = async (fees: FeeItem[]) => {
  const prompt = `
    Bạn là một chuyên gia quản lý tài chính chung cư. Hãy phân tích danh sách dữ liệu thu phí sau và đưa ra:
    1. Nhận xét ngắn gọn về tỷ lệ hoàn thành (đã thu/tổng).
    2. Cảnh báo về các căn hộ quá hạn.
    3. Gợi ý 1-2 hành động cụ thể để cải thiện nguồn thu.
    
    Dữ liệu (JSON): ${JSON.stringify(fees)}
    
    Yêu cầu: Trả lời bằng tiếng Việt, súc tích, định dạng Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Không thể kết nối với trí tuệ nhân tạo lúc này. Vui lòng thử lại sau.";
  }
};

/**
 * Soạn thảo tin nhắn nhắc nợ cá nhân hóa
 */
export const draftReminderAI = async (residentName: string, amount: number, apartmentId: string) => {
  const prompt = `
    Hãy soạn một tin nhắn nhắc nợ phí chung cư (điện, nước, quản lý) cho cư dân:
    - Tên: ${residentName}
    - Căn hộ: ${apartmentId}
    - Số tiền nợ: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}
    
    Yêu cầu: 
    - Giọng văn: Lịch sự, chân thành nhưng vẫn chuyên nghiệp.
    - Ngắn gọn để gửi qua Zalo/SMS.
    - Có lời cảm ơn ở cuối.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Drafting Error:", error);
    return "Lỗi soạn thảo tự động.";
  }
};
