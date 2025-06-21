import React, { Suspense } from "react";
import SuspenceLoader from "./suspence-loader";

export default function PageContainer({
  children,
  actions,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  actions?: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <Suspense fallback={
      <SuspenceLoader />
    }>
      <header className="flex flex-col gap-3 md:flex-row justify-between p-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-700 dark:text-slate-300">{title}</h1>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
        <div>
          {actions}
        </div>
      </header>
      <div className="p-2">
        {children}
      </div>
    </Suspense>
  )
}
