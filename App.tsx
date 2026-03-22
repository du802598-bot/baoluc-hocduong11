/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI } from "@google/genai";
import { 
  Shield, 
  Eye, 
  AlertTriangle, 
  Cpu, 
  Camera, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight,
  Share2,
  MessageSquare,
  Facebook,
  Clock,
  User,
  X,
  Calendar,
  CheckCircle2,
  Send,
  Bot,
  Loader2
} from "lucide-react";

// Initialize Gemini AI
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  
  // AI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Xin chào! Tôi là trợ lý AI chuyên về phòng chống bạo lực học đường. Bạn cần tôi giải đáp thắc mắc gì không?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = "Ứng dụng AI tự động nhận diện, cảnh báo sớm nguy cơ, ngăn chặn bạo lực học đường";

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    zalo: `https://zalo.me/share?url=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userMessage = chatInput.trim();
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setChatInput("");
    setIsTyping(true);

    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "Bạn là một trợ lý AI chuyên gia về phòng chống bạo lực học đường tại Việt Nam. Hãy trả lời các câu hỏi một cách lịch sự, thấu cảm và cung cấp các giải pháp thiết thực dựa trên kế hoạch của UBND TP.HCM và Chỉ thị 03/CT-TTg. Nếu có tình huống khẩn cấp, hãy khuyên người dùng gọi ngay hotline 0382895453 hoặc báo cáo cho nhà trường/công an.",
        },
      });

      const aiText = response.text || "Xin lỗi, tôi gặp chút trục trặc khi xử lý câu hỏi. Vui lòng thử lại sau.";
      setMessages(prev => [...prev, { role: "ai", text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: "ai", text: "Rất tiếc, tôi không thể kết nối với máy chủ AI lúc này. Vui lòng kiểm tra kết nối mạng." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsBookingOpen(false);
    }, 3000);
  };

  const articleContent = [
    "UBND TP.HCM vừa ban hành kế hoạch triển khai các giải pháp đồng bộ nhằm ngăn chặn bạo lực học đường, trong đó nhấn mạnh việc sử dụng trí tuệ nhân tạo (AI) và xử lý nghiêm người đứng đầu để xảy ra bạo lực.",
    "Kế hoạch số 104/KH-UBND vừa được thành phố ban hành nhằm thực hiện Chỉ thị số 03/CT-TTg của Thủ tướng Chính phủ, với mục tiêu cốt lõi là xây dựng môi trường giáo dục an toàn, lành mạnh và giảm thiểu tối đa các vụ việc bạo lực, đặc biệt là bạo lực trên không gian mạng.",
    "Chuyển đổi số và ứng dụng công nghệ được xem là một trong những điểm nhấn nổi bật của kế hoạch lần này. Cụ thể, thành phố yêu cầu tăng cường ứng dụng công nghệ thông tin và trí tuệ nhân tạo (AI) trong việc quản lý, giám sát và cảnh báo sớm các nguy cơ bạo lực học đường.",
    "Lực lượng Công an Thành phố sẽ chủ trì, phối hợp với các địa phương rà soát, củng cố và mở rộng hệ thống camera giám sát tại khu vực trường học. Đáng chú ý, cơ quan chức năng sẽ nghiên cứu ứng dụng công nghệ phân tích hình ảnh để có thể tự động phát hiện, ghi nhận vi phạm và nhận diện nguy cơ từ sớm. Cùng với đó, các trường học phải thiết lập và vận hành trơn tru kênh tiếp nhận thông tin về bạo lực học đường thông qua hệ thống camera giám sát, đường dây nóng và các hình thức phù hợp khác.",
    "Song song với giải pháp công nghệ, yếu tố con người và trách nhiệm quản lý cũng được siết chặt một cách quyết liệt. Kế hoạch quy định rõ người đứng đầu các cơ sở giáo dục phải chịu trách nhiệm trực tiếp và toàn diện về công tác bảo đảm an toàn trường học. Cơ quan quản lý sẽ xem xét trách nhiệm của lãnh đạo nhà trường nếu để xảy ra các vụ việc bạo lực nghiêm trọng, hoặc có biểu hiện xử lý không kịp thời, sai quy định.",
    "Thành phố cũng chỉ đạo rà soát đánh ngũ, kiên quyết đảm bảo không có cán bộ quản lý, giáo viên, nhân viên vi phạm đạo đức nhà giáo làm việc trong cơ sở giáo dục. Đối với những giáo viên có hành vi bạo lực, thành phố yêu cầu xử lý nghiêm minh theo đúng quy định của pháp luật.",
    "Để giải quyết vấn đề từ gốc rễ, ngành giáo dục được yêu cầu đẩy mạnh tư vấn tâm lý, ưu tiên hỗ trợ cho những học sinh có nguy cơ cao hoặc đang là nạn nhân của bạo lực học đường. Các trường học phải duy trì và nâng cao chất lượng của hoạt động công tác xã hội trường học, đồng thời xây dựng mạng lưới tham vấn, chuyển tuyến hỗ trợ khi cần thiết.",
    "Về mặt phối hợp, thành phố yêu cầu thiết lập cơ chế bảo đảm thông tin hai chiều liên tục, kịp thời giữa nhà trường, gia đình và chính quyền địa phương để xử lý ngay các tình huống phát sinh. Sở GDĐT TP.HCM sẽ là cơ quan đầu mối theo dõi, kiểm tra và tổng hợp tình hình triển khai thực hiện kế hoạch này trên toàn địa bàn.",
    "Trước đó, ngày 30/1/2026, nhằm giải quyết triệt để tình trạng bạo lực học đường đang gây nhối dư luận thời gian qua, Phó Thủ tướng Lê Thành Long vừa thay mặt Thủ tướng ký ban hành Chỉ thị số 03/CT-TTg. Dù môi trường giáo dục đã có nhiều cải thiện, những vụ việc bạo lực phức tạp, đặc biệt là ở ngoài khuôn viên nhà trường, vẫn tiếp tục đe dọa đến thể chất và tinh thần của học sinh.",
    "Thủ tướng Chính phủ yêu cầu Bộ GDĐT cùng các cơ quan chức năng phải vào cuộc quyết liệt, đồng bộ. Điểm đột phá đáng chú ý trong Chỉ thị lần này là việc khuyến khích ứng dụng trí tuệ nhân tạo (AI) và công nghệ thông tin vào công tác quản lý, giám sát học sinh.",
    "Kết hợp cùng cơ chế phối hợp liên ngành chặt chẽ, giải pháp này được kỳ vọng sẽ giúp nhận diện sớm các nguy cơ, từ đó can thiệp, xử lý kịp thời và trang bị kỹ năng phòng vệ cho các em ngay từ khi mới có dấu hiệu bạo lực."
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-red-100 selection:text-red-900">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-600" />
            <span className="font-bold text-lg tracking-tight uppercase">Phòng Chống Bạo Lực Học Đường</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider opacity-60">
            <a href="#tin-tuc" className="hover:opacity-100 transition-opacity">Tin tức</a>
            <a href="#giai-phap-ai" className="hover:opacity-100 transition-opacity">Giải pháp AI</a>
            <a href="#tu-van-tam-ly" className="hover:opacity-100 transition-opacity">Tư vấn tâm lý</a>
            <a href="#lien-he" className="hover:opacity-100 transition-opacity">Liên hệ</a>
          </div>
          <a href="#lien-he" className="bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
            BÁO CÁO KHẨN
          </a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Article Header */}
        <header id="tin-tuc" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-4 mb-6 text-xs font-bold uppercase tracking-widest text-red-600">
            <span className="bg-red-50 px-2 py-1 rounded">Công nghệ & Giáo dục</span>
            <span className="text-black/30">•</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 22/03/2026 09:59 GMT+7</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] mb-8 tracking-tight">
            Ứng dụng AI tự động nhận diện, cảnh báo sớm nguy cơ, ngăn chặn bạo lực học đường
          </h1>

          <div className="flex items-center justify-between border-y border-black/5 py-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center">
                <User className="w-5 h-5 text-stone-500" />
              </div>
              <div>
                <p className="font-bold text-sm">Nguyễn Văn Dư</p>
                <p className="text-xs opacity-50">Phóng viên Dân Việt</p>
              </div>
            </div>
            <div className="flex items-center gap-4 relative">
              <div className="relative">
                <button 
                  onClick={() => setIsShareOpen(!isShareOpen)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Share2 className="w-4 h-4" /> Chia sẻ
                </button>
                <AnimatePresence>
                  {isShareOpen && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-stone-100 p-2 z-20"
                    >
                      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 hover:bg-stone-50 rounded-xl transition-colors text-sm font-medium">
                        <Facebook className="w-4 h-4 text-blue-600" /> Facebook
                      </a>
                      <a href={shareLinks.zalo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 hover:bg-stone-50 rounded-xl transition-colors text-sm font-medium">
                        <MessageSquare className="w-4 h-4 text-blue-400" /> Zalo
                      </a>
                      <a href={shareLinks.email} className="flex items-center gap-3 p-3 hover:bg-stone-50 rounded-xl transition-colors text-sm font-medium">
                        <Mail className="w-4 h-4 text-red-500" /> Email
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                <MessageSquare className="w-4 h-4" /> Bình luận (0)
              </button>
            </div>
          </div>
        </header>

        {/* Hero Image with AI Overlay Effect */}
        <section className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl group">
          <img 
            src="https://picsum.photos/seed/school-ai/1200/800" 
            alt="AI Surveillance in Schools" 
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
          />
          {/* AI Overlay Mockup */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute top-1/4 left-1/3 w-32 h-48 border-2 border-red-500 rounded-sm"
            >
              <div className="absolute -top-6 left-0 bg-red-500 text-white text-[10px] px-1 font-mono uppercase">
                Risk: 92% - Violence Detected
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute top-1/3 right-1/4 w-24 h-40 border-2 border-yellow-400 rounded-sm"
            >
              <div className="absolute -top-6 left-0 bg-yellow-400 text-black text-[10px] px-1 font-mono uppercase">
                Tracking: ID_442
              </div>
            </motion.div>
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white p-3 rounded font-mono text-[10px] border border-white/10">
              <div className="flex items-center gap-2 text-green-400 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                SYSTEM ACTIVE
              </div>
              <div>CAM_04: MAIN HALLWAY</div>
              <div>SCANNING: 42 SUBJECTS</div>
            </div>
          </div>
          <p className="bg-stone-100 p-4 text-sm italic text-stone-600 border-l-4 border-red-600">
            TP.HCM đặt mục tiêu đưa AI vào cảnh báo sớm nguy cơ bạo lực học đường. Ảnh minh hoạ
          </p>
        </section>

        {/* Article Body */}
        <article className="prose prose-stone max-w-none mb-16">
          <p className="text-xl font-medium leading-relaxed text-stone-700 mb-8 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-red-600">
            {articleContent[0]}
          </p>

          <div id="giai-phap-ai" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 scroll-mt-24">
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <AlertTriangle className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Cảnh báo sớm</h3>
              <p className="text-sm opacity-70">Nhận diện hành vi bất thường qua hệ thống camera thông minh.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <Cpu className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Trí tuệ nhân tạo</h3>
              <p className="text-sm opacity-70">Phân tích dữ liệu hình ảnh thời gian thực để phát hiện vi phạm.</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <Shield className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Môi trường an toàn</h3>
              <p className="text-sm opacity-70">Xây dựng không gian giáo dục lành mạnh cho học sinh.</p>
            </div>
          </div>

          {articleContent.slice(1, 4).map((para, i) => (
            <p key={i} className="text-lg leading-relaxed mb-6 text-stone-800">
              {para}
            </p>
          ))}

          {/* Video Section */}
          <div className="my-12 rounded-2xl overflow-hidden shadow-xl aspect-video bg-black">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/3AWeLuk-WME" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>

          {articleContent.slice(4).map((para, i) => (
            <p key={i} className="text-lg leading-relaxed mb-6 text-stone-800">
              {para}
            </p>
          ))}
        </article>

        {/* Psychological Support Section */}
        <section id="tu-van-tam-ly" className="mb-16 scroll-mt-24">
          <div className="bg-stone-50 border border-stone-200 rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-8 h-8 text-red-600" />
              <h2 className="text-3xl font-bold tracking-tight">Tư vấn tâm lý & Hỗ trợ học đường</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-lg text-stone-700 leading-relaxed">
                  Để giải quyết vấn đề từ gốc rễ, ngành giáo dục được yêu cầu đẩy mạnh tư vấn tâm lý, ưu tiên hỗ trợ cho những học sinh có nguy cơ cao hoặc đang là nạn nhân của bạo lực học đường.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <ChevronRight className="w-4 h-4 text-red-600" /> Mạng lưới tham vấn tâm lý chuyên sâu
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <ChevronRight className="w-4 h-4 text-red-600" /> Hỗ trợ chuyển tuyến y tế khi cần thiết
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <ChevronRight className="w-4 h-4 text-red-600" /> Công tác xã hội trường học chuyên nghiệp
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                <h4 className="font-bold mb-4 text-red-600 uppercase tracking-widest text-xs">Hotline Tư Vấn 24/7</h4>
                <p className="text-3xl font-mono font-bold mb-2">0382895453</p>
                <p className="text-sm opacity-60">Mọi thông tin phản ánh sẽ được bảo mật tuyệt đối.</p>
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="mt-6 w-full py-3 bg-stone-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors"
                >
                  ĐẶT LỊCH HẸN TƯ VẤN
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Support Section */}
        <section id="ho-tro-phap-ly" className="mb-16 scroll-mt-24">
          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold tracking-tight">Hỗ trợ pháp lý & Bảo vệ quyền lợi</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a 
                href="https://zalo.me/luatsuhuan11" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-2xl shadow-sm border-2 border-red-100 hover:shadow-md transition-shadow group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                  Luật sư hỗ trợ
                </div>
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                  <MessageSquare className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold mb-2">Luật sư Huân</h3>
                <p className="text-xs text-stone-500 mb-4">Tư vấn pháp lý trực tiếp qua Zalo về các vấn đề bạo lực học đường.</p>
                <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                  Nhắn tin Zalo <ChevronRight className="w-3 h-3" />
                </span>
              </a>

              <a 
                href="https://www.hcmcbar.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow group"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <User className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold mb-2">Đoàn Luật sư TP.HCM</h3>
                <p className="text-xs text-stone-500 mb-4">Tổ chức xã hội - nghề nghiệp của các luật sư tại TP. Hồ Chí Minh.</p>
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                  Truy cập trang web <ChevronRight className="w-3 h-3" />
                </span>
              </a>

              <a 
                href="https://trogiupphaply.tphcm.gov.vn/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow group"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Shield className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold mb-2">Trợ giúp pháp lý Nhà nước</h3>
                <p className="text-xs text-stone-500 mb-4">Cung cấp dịch vụ pháp lý miễn phí cho các đối tượng chính sách.</p>
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                  Truy cập trang web <ChevronRight className="w-3 h-3" />
                </span>
              </a>

              <a 
                href="http://treemvietnam.vn/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow group"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Eye className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold mb-2">Hội Bảo vệ quyền trẻ em</h3>
                <p className="text-xs text-stone-500 mb-4">Tổ chức bảo vệ các quyền cơ bản của trẻ em Việt Nam.</p>
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                  Truy cập trang web <ChevronRight className="w-3 h-3" />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="lien-he" className="bg-stone-900 text-white rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden scroll-mt-24">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Phone className="w-8 h-8 text-red-500" /> Thông tin liên hệ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Địa chỉ</p>
                    <p className="text-lg">Xã Sơn Kiên, huyện Hòn Đất, tỉnh An Giang</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Số điện thoại</p>
                    <p className="text-lg font-mono">0382895453</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Email</p>
                    <p className="text-lg">du802598@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Zalo Luật sư Huân</p>
                    <a href="https://zalo.me/luatsuhuan11" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-red-400 transition-colors">zalo.me/luatsuhuan11</a>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h3 className="font-bold mb-4">Gửi yêu cầu hỗ trợ</h3>
                <div className="space-y-4">
                  <input type="text" placeholder="Họ và tên" className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-500 transition-colors" />
                  <input type="email" placeholder="Email liên hệ" className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-500 transition-colors" />
                  <textarea placeholder="Nội dung phản ánh..." rows={3} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-500 transition-colors resize-none"></textarea>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors">GỬI THÔNG TIN</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-red-600 p-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <h3 className="font-bold uppercase tracking-widest text-sm">Đặt lịch tư vấn</h3>
                </div>
                <button 
                  onClick={() => setIsBookingOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Đã gửi yêu cầu!</h4>
                    <p className="text-stone-500 text-sm">Chúng tôi sẽ liên hệ với bạn sớm nhất có thể để xác nhận lịch hẹn.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Họ và tên</label>
                      <input required type="text" className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors" placeholder="Nguyễn Văn A" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Số điện thoại</label>
                      <input required type="tel" className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors" placeholder="0382895453" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Ngày hẹn</label>
                        <input required type="date" className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Giờ hẹn</label>
                        <input required type="time" className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Ghi chú thêm</label>
                      <textarea className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors resize-none" rows={2} placeholder="Vấn đề cần tư vấn..."></textarea>
                    </div>
                    <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-red-100 mt-4">
                      XÁC NHẬN ĐẶT LỊCH
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AI Chat Assistant */}
      <div className="fixed bottom-6 right-6 z-[90]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-stone-900 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Trợ lý AI</p>
                    <p className="text-[10px] text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Đang trực tuyến
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === "user" 
                        ? "bg-red-600 text-white rounded-tr-none" 
                        : "bg-white border border-stone-200 text-stone-800 rounded-tl-none shadow-sm"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-stone-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                      <Loader2 className="w-4 h-4 animate-spin text-stone-400" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-stone-100 flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="flex-1 bg-stone-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-500/20 outline-none"
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim() || isTyping}
                  className="bg-red-600 text-white p-2 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-red-700 transition-colors"
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Footer */}
      <footer className="bg-stone-100 border-t border-black/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            <span className="font-bold text-sm tracking-tight uppercase">Phòng Chống Bạo Lực Học Đường</span>
          </div>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-widest opacity-40">
            <a href="#" className="hover:opacity-100 transition-opacity">Chính sách bảo mật</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Điều khoản sử dụng</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Bản quyền © 2026</a>
          </div>
          <div className="flex gap-4">
            <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={shareLinks.zalo} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer">
              <MessageSquare className="w-4 h-4" />
            </a>
            <a href={shareLinks.email} className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
