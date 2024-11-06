

// userAgent.tsx
import { headers } from 'next/headers';
 import { UserAgentProvider } from "@/components/providers/userAgentProvider";
import { UserAgentContent } from './UserAgentContent';

export const UserAgent = async () => {
  // Get user agent on the server side
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || 'Unknown';

  return (
    <UserAgentProvider initialUserAgent={userAgent}>
      <UserAgentContent serverUserAgent={userAgent} />
    </UserAgentProvider>
  );
};