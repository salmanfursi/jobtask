
// Separate client component for interactive features
"use client";

import { BackToHome } from "@/components/backToHome/backToHome";
import { useUserAgentContext } from "@/components/providers/userAgentProvider";

export const UserAgentContent = ({ serverUserAgent }: { serverUserAgent: string }) => {
  const { userAgent } = useUserAgentContext();
  
  return (
    <div>
      <BackToHome />
      <div className="flex font-mono font-semibold text-sm">
        <div className="border p-2">UserAgent</div>
        <div className="border p-2">{userAgent || serverUserAgent}</div>
      </div>
     </div>
  );
};