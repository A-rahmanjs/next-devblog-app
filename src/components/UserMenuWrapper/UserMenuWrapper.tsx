// UserMenuWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const UserMenu = dynamic(() => import("@/components/UserMenu/UserMenu"), { ssr: false });

export default function UserMenuWrapper() {
  return <UserMenu />;
}
