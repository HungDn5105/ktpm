
import { GoogleGenAI } from "@google/genai";
import { FeeItem } from "../types";

export const analyzeFeesWithAI = async (fees: FeeItem[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const statsSummary = {
    total: fees.length,
    paid: fees.filter(f => f.status === 'PAID').length,
    pending: fees.filter(f => f.status === 'PENDING').length,
    overdue: fees.filter(f => f.status === 'OVERDUE').length,
    totalAmount: fees.reduce((sum, f) => sum + f.total, 0),
    paidAmount: fees.filter(f => f.status === 'PAID').reduce((sum, f) => sum + f.total, 0)
  };

  const prompt = `Bạn là một chuyên gia quản lý tài chính chung cư. 
  Dưới đây là số liệu thu phí tháng này:
  - Tổng số hộ: ${statsSummary.total}
  - Đã thu: ${statsSummary.paid} hộ (${statsSummary.paidAmount.toLocaleString('vi-VN')} VND)
  - Chờ thu: ${statsSummary.pending} hộ
  - Quá hạn: ${statsSummary.overdue} hộ
  
  Hãy đưa ra 3 câu nhận xét ngắn gọn, chuyên nghiệp về tình hình tài chính và 1 lời khuyên hành động. 
  Định dạng: Trả về văn bản thuần túy, các ý gạch đầu dòng.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Không thể kết nối với trí tuệ nhân tạo lúc này.";
  }
};

export const draftReminderAI = async (fee: FeeItem) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Hãy soạn một tin nhắn nhắc nợ phí chung cư ngắn gọn, lịch sự cho cư dân ${fee.residentName} ở căn hộ ${fee.apartmentId}.
  Số tiền nợ: ${fee.total.toLocaleString('vi-VN')} VND. 
  Trạng thái: ${fee.status === 'OVERDUE' ? 'Đã quá hạn' : 'Sắp đến hạn'}.
  Yêu cầu: Văn phong chuyên nghiệp, tinh tế nhưng rõ ràng.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return "Lỗi khi soạn văn bản tự động.";
  }
};
