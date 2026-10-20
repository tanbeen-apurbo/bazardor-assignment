const Footer = () => {
  return (
    <footer className="w-full border-t border-[#e5ebe6] bg-[#fbfdfc] font-['Hind_Siliguri','Noto_Sans_Bengali',sans-serif]">
      <div className="mx-auto flex min-h-[40px] w-[92%] max-w-[848px] flex-col items-center justify-center gap-1 py-2 text-center text-[9px] leading-[14px] text-[#303a34] sm:w-[82%] sm:flex-row sm:justify-between sm:gap-4 sm:text-left">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>

        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
};

export default Footer;