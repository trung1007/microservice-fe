import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between py-4 px-8 group border-b border-transparent hover:border-gray-300 transition-all duration-200">
      <span>Logo</span>
      <div className="flex gap-2">
        <button className="px-3 py-2 rounded-[24px] border-2 border-[#00713D] text-[#00713D]">
          <Link href="/login" className="uppercase text-[12px] font-bold">
            Đăng Nhập
          </Link>
        </button>
        <button className="px-3 py-2 rounded-[24px] border-2 border-[#0db0c5] text-[#0db0c5]">
          <Link
            href="/login/register"
            className="uppercase text-[12px] font-bold"
          >
            Đăng Ký
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
