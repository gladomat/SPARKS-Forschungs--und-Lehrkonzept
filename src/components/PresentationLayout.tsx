import React from 'react';
import { cn } from '../lib/utils';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavItem {
  id: string;
  label: string;
  number: number;
}

interface NavPart {
  id: string;
  label: string;
  slides: NavItem[];
}

interface PresentationLayoutProps {
  children: React.ReactNode;
  currentSlide: number;
  totalSlides: number;
  showSidebar?: boolean;
  activeSection?: string;
  onNavigate?: (slideNumber: number) => void;
  parts?: NavPart[];
}

export const PresentationLayout: React.FC<PresentationLayoutProps> = ({
  children,
  currentSlide,
  totalSlides,
  showSidebar = true,
  onNavigate,
  parts = [],
}) => {
  const activePart = (parts ?? []).find(part =>
    part.slides.some(slide => slide.number === currentSlide)
  )?.id ?? parts?.[0]?.id ?? '';

  return (
    <div className="w-full h-screen bg-background text-on-surface flex flex-col overflow-hidden select-none">
      {/* Persistent orbiting ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="blob-orbit-a absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-surface-container-highest rounded-full mix-blend-multiply blur-3xl opacity-50" />
        <div className="blob-orbit-b absolute bottom-0 left-0 -mb-32 w-[600px] h-[600px] bg-action-orange/5 rounded-full mix-blend-multiply blur-3xl" />
        <div className="blob-drift-c absolute top-1/2 left-1/3 -ml-48 -mt-48 w-[500px] h-[500px] bg-action-orange/[0.03] rounded-full mix-blend-multiply blur-3xl" />
      </div>

      {/* Top Navigation */}
      <nav className="flex justify-between items-center w-full px-12 h-16 bg-surface fixed top-0 z-50 border-b border-surface-container-high">
        <div className="text-lg font-extrabold font-headline text-deep-onyx tracking-tighter">
          Sparks University of Applied Sciences
        </div>
        <div className="font-mono text-xs text-data-gray tracking-widest uppercase">
          Data Science
        </div>
      </nav>

      <div className="flex-grow flex pt-16 pb-12">
        {/* Sidebar */}
        {showSidebar && (
          <aside className="w-64 flex flex-col py-8 bg-surface-container-low shrink-0 border-r border-surface-container-high overflow-y-auto">
            <nav className="flex flex-col gap-4 py-2">
              {(parts ?? []).map((part) => {
                const isOpen = part.id === activePart;
                return (
                  <div key={part.id}>
                    <button
                      onClick={() => onNavigate?.(part.slides[0]?.number)}
                      className="w-full flex items-center justify-between pl-8 pr-4 py-3
                                 text-xs font-extrabold font-headline uppercase tracking-widest
                                 text-data-gray hover:text-action-orange transition-colors"
                    >
                      <span>{part.label}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 0 : -90 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          {part.slides.map((item, index) => (
                            <div
                              key={item.id}
                              onClick={() => onNavigate?.(item.number)}
                              className={cn(
                                "pl-8 py-2 font-body font-medium text-xs flex items-center gap-3 transition-all cursor-pointer",
                                currentSlide === item.number
                                  ? "text-action-orange font-bold border-l-4 border-action-orange bg-surface-container"
                                  : "text-data-gray hover:bg-surface-container/50"
                              )}
                            >
                              <span className="opacity-40 font-mono text-[0.6rem] w-4 shrink-0">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <span className="truncate">{item.label}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
          </aside>
        )}

        {/* Main Canvas */}
        <main className={cn("flex-grow relative", !showSidebar && "w-full")}>
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full flex justify-between items-center px-12 h-12 bg-surface border-t border-surface-container-high z-50">
        <div className="font-mono font-medium tracking-[0.2em] text-[0.65rem] text-data-gray uppercase">
          Lehrkonzept
        </div>
        <div className="flex gap-8 items-center">
          <div className="h-12 flex items-center bg-action-orange px-6 text-white font-extrabold font-headline text-[0.75rem] tracking-widest">
            {String(currentSlide).padStart(2, '0')}
          </div>
        </div>
      </footer>
    </div>
  );
};
