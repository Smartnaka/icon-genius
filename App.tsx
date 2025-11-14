
import React, { useState, useCallback, useEffect } from 'react';
import type { GeneratedIcon, HistoryItem, GeneratedIconSet } from './types';
import { generateIcons } from './services/geminiService';

declare const JSZip: any;

const HISTORY_STORAGE_KEY = 'icon-genius-history';
const STYLES = ['Flat', '3D', 'Minimalist', 'Gradient', 'Neumorphic', 'Line Art', 'Abstract', 'Cartoon', 'Watercolor'];

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const HistoryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

const XMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);


const Header: React.FC = () => (
  <header className="text-center p-4 md:p-6">
    <div className="flex items-center justify-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
        <SparklesIcon className="w-7 h-7 text-white" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-900">
        IconGenius
      </h1>
    </div>
    <p className="mt-3 text-lg text-zinc-600 max-w-2xl mx-auto">
      Turn your ideas into a stunning, complete set of app icons. Just describe what you envision, and let AI do the magic.
    </p>
  </header>
);

interface PromptFormProps {
  onSubmit: (prompt: string, style: string) => void;
  isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState(STYLES[0].toLowerCase());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim(), style);
    }
  };

  return (
    <div className="sticky bottom-0 z-10 w-full bg-gray-50/80 backdrop-blur-md border-t border-zinc-200/50 md:static md:bg-transparent md:backdrop-blur-none md:border-t-0 p-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-2">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., a rocket ship for a productivity app"
                className="flex-grow bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 rounded-md p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 disabled:opacity-50"
                disabled={isLoading}
                />
                <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                disabled={isLoading}
                className="bg-white border border-zinc-300 text-zinc-900 rounded-md p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 disabled:opacity-50"
                aria-label="Select icon style"
                >
                {STYLES.map(s => <option key={s} value={s.toLowerCase()}>{s}</option>)}
                </select>
                <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center px-5 py-3 font-semibold text-white bg-gradient-to-br from-teal-500 to-cyan-600 rounded-md hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105 active:scale-100"
                >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <>
                    <SparklesIcon className="w-5 h-5 mr-2 hidden sm:inline-block" />
                    Generate
                    </>
                )}
                </button>
            </form>
        </div>
    </div>
  );
};

const DownloadButton: React.FC<{ src: string, filename: string }> = ({ src, filename }) => (
    <a
      href={src}
      download={filename}
      className="absolute top-2 right-2 flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 hover:bg-white/30 transition-all duration-300"
    >
      <DownloadIcon className="w-4 h-4" />
      <span className="text-sm">Download</span>
    </a>
);


interface IconCardProps {
  icon: GeneratedIcon;
  filename: string;
}

const IconCard: React.FC<IconCardProps> = ({ icon, filename }) => (
    <div className="group relative aspect-square bg-white rounded-lg overflow-hidden border border-zinc-200 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-teal-500/20">
      <img src={icon.src} alt={`Generated icon for: ${icon.prompt}`} className="w-full h-full object-cover"/>
      <DownloadButton src={icon.src} filename={filename} />
    </div>
);

const SkeletonCard: React.FC<{ className?: string }> = ({ className = "aspect-square" }) => (
  <div className={`${className} bg-zinc-200 rounded-lg animate-pulse`}></div>
);

const AdaptiveIconPreview: React.FC<{ icons: GeneratedIcon[] }> = ({ icons }) => {
    const foreground = icons.find(i => i.role === 'foreground');
    const background = icons.find(i => i.role === 'background');

    if (!foreground || !background) return null;

    return (
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="w-full md:w-1/3 text-center">
                <h3 className="font-semibold text-lg text-zinc-700 mb-2">Preview</h3>
                <div 
                    className="relative w-48 h-48 mx-auto bg-center bg-cover rounded-[36px] shadow-lg border border-zinc-200" 
                    style={{ backgroundImage: `url(${background.src})` }}
                >
                    <img src={foreground.src} alt="Foreground" className="w-full h-full object-contain" />
                </div>
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-2 gap-4">
                <div className="group relative">
                    <p className="text-center font-medium text-zinc-600 mb-2">Foreground</p>
                    <img src={foreground.src} alt="Foreground layer" className="w-full aspect-square rounded-lg border border-zinc-200 object-cover shadow-sm" />
                    <DownloadButton src={foreground.src} filename="icongenius-adaptive-fg.png" />
                </div>
                <div className="group relative">
                    <p className="text-center font-medium text-zinc-600 mb-2">Background</p>
                    <img src={background.src} alt="Background layer" className="w-full aspect-square rounded-lg border border-zinc-200 object-cover shadow-sm" />
                    <DownloadButton src={background.src} filename="icongenius-adaptive-bg.png" />
                </div>
            </div>
        </div>
    );
};

const SplashScreenPreview: React.FC<{ icon: GeneratedIcon }> = ({ icon }) => (
    <div className="w-full h-full bg-zinc-800 rounded-[28px] p-2 shadow-2xl border-2 border-zinc-300">
        <div 
            className="w-full h-full bg-cover bg-center rounded-[20px] group relative"
            style={{ backgroundImage: `url(${icon.src})` }}
        >
            <DownloadButton src={icon.src} filename="icongenius-splash.png" />
        </div>
    </div>
);

interface HistorySidebarProps {
    history: HistoryItem[];
    onSelect: (id: string) => void;
    onClear: () => void;
    selectedId: string | null;
    onClose: () => void;
}
  
const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, onSelect, onClear, selectedId, onClose }) => {
    return (
        <aside className="w-full h-full bg-white/80 backdrop-blur-md md:bg-zinc-100/50 border-r border-zinc-200/50 flex-shrink-0 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-zinc-700 flex items-center gap-2">
                    <HistoryIcon className="w-6 h-6" />
                    History
                </h2>
                <div className="flex items-center gap-2">
                    {history.length > 0 && (
                        <button onClick={onClear} className="text-zinc-500 hover:text-red-500 transition-colors p-1 rounded-md" aria-label="Clear history">
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    )}
                    <button onClick={onClose} className="md:hidden text-zinc-500 hover:text-zinc-800 transition-colors p-1 rounded-md" aria-label="Close history panel">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
            {history.length === 0 ? (
                <div className="text-center text-zinc-500 flex-grow flex flex-col items-center justify-center">
                    <p>No generations yet.</p>
                    <p className="text-sm">Your creations will appear here.</p>
                </div>
            ) : (
                <ul className="space-y-2 overflow-y-auto flex-grow">
                    {history.map(item => (
                        <li key={item.id}>
                            <button
                                onClick={() => onSelect(item.id)}
                                className={`w-full text-left p-3 rounded-md transition-colors text-zinc-700 hover:bg-zinc-200/50 ${selectedId === item.id ? 'bg-teal-500/10 ring-1 ring-teal-500 text-teal-600' : 'bg-white/70'}`}
                            >
                                <p className="font-medium truncate">{item.prompt}</p>
                                <div className="flex items-center justify-between mt-1 text-xs">
                                  <p className="text-zinc-500">{new Date(item.timestamp).toLocaleDateString()}</p>
                                  <span className="capitalize px-2 py-0.5 bg-zinc-200 text-zinc-600 rounded-full font-medium">{item.style}</span>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </aside>
    );
};

interface DownloadAllButtonProps {
    icons: GeneratedIconSet;
    prompt: string;
    onError: (message: string | null) => void;
}

const DownloadAllButton: React.FC<DownloadAllButtonProps> = ({ icons, prompt, onError }) => {
    const [isZipping, setIsZipping] = useState(false);
  
    const handleDownload = async () => {
      if (!icons || typeof JSZip === 'undefined') {
        if (typeof JSZip === 'undefined') {
          console.error("JSZip library is not loaded.");
          onError("Could not create zip file: JSZip library not found.");
        }
        return;
      }
      setIsZipping(true);
      onError(null);
  
      try {
        const zip = new JSZip();
        
        const getBase64Data = (src: string) => src.split(',')[1];
  
        // Add standard icons
        icons.standard.forEach((icon, index) => {
          zip.file(`standard-${index + 1}.png`, getBase64Data(icon.src), { base64: true });
        });
  
        // Add other icons
        zip.file('favicon.png', getBase64Data(icons.favicon.src), { base64: true });
        zip.file('splash.png', getBase64Data(icons.splash.src), { base64: true });
        
        // Add adaptive icons in a subfolder
        const adaptiveFolder = zip.folder('adaptive');
        if (adaptiveFolder) {
            adaptiveFolder.file('foreground.png', getBase64Data(icons.adaptive.foreground.src), { base64: true });
            adaptiveFolder.file('background.png', getBase64Data(icons.adaptive.background.src), { base64: true });
        }
        
        const content = await zip.generateAsync({ type: 'blob' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        const safePrompt = prompt.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        link.download = `icongenius_${safePrompt || 'icons'}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
  
      } catch (error) {
        console.error("Failed to create zip file", error);
        onError('Could not create the zip file. Please try again.');
      } finally {
        setIsZipping(false);
      }
    };
  
    return (
      <button
        onClick={handleDownload}
        disabled={isZipping}
        className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-gradient-to-br from-teal-500 to-cyan-600 rounded-md hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105 active:scale-100 shadow-lg hover:shadow-cyan-500/30"
      >
        {isZipping ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Zipping...
          </>
        ) : (
          <>
            <DownloadIcon className="w-5 h-5 mr-2" />
            Download All (.zip)
          </>
        )}
      </button>
    );
};


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [icons, setIcons] = useState<GeneratedIconSet | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (storedHistory) {
        const parsedHistory: HistoryItem[] = JSON.parse(storedHistory);
        const validHistory = parsedHistory.filter(item => 
            item.icons && item.icons.standard && item.icons.adaptive && item.icons.splash && item.icons.favicon
        );
        setHistory(validHistory);
      }
    } catch (e) {
      console.error("Failed to load history from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  }, [history]);

  const handleGenerate = useCallback(async (prompt: string, style: string) => {
    setIsLoading(true);
    setError(null);
    setIcons(null);
    setSelectedHistoryId(null);
    try {
      const generatedIcons = await generateIcons(prompt, style);
      setIcons(generatedIcons);

      const newHistoryItem: HistoryItem = {
        id: `gen-${Date.now()}`,
        prompt,
        style,
        icons: generatedIcons,
        timestamp: Date.now(),
      };
      
      setHistory(prevHistory => [newHistoryItem, ...prevHistory]);
      setSelectedHistoryId(newHistoryItem.id);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectHistory = useCallback((id: string) => {
    const selectedItem = history.find(item => item.id === id);
    if (selectedItem) {
      setIsLoading(false);
      setError(null);
      setIcons(selectedItem.icons);
      setSelectedHistoryId(id);
    }
  }, [history]);

  const handleClearHistory = useCallback(() => {
    if (window.confirm("Are you sure you want to clear all generation history? This action cannot be undone.")) {
        setHistory([]);
        setIcons(null);
        setSelectedHistoryId(null);
        setError(null);
    }
  }, []);

  const handleSelectHistoryWithClose = useCallback((id: string) => {
    handleSelectHistory(id);
    setIsHistoryVisible(false);
  }, [handleSelectHistory]);

  const handleClearHistoryWithClose = useCallback(() => {
    handleClearHistory();
    setIsHistoryVisible(false);
  }, [handleClearHistory]);

  const SectionTitle: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <h2 className="text-2xl font-bold text-zinc-800 text-center mb-6">{children}</h2>
  );

  const renderContent = () => {
    if (isLoading) {
        return (
            <>
                <div className="text-center transition-opacity duration-300">
                    <div className="inline-flex items-center gap-3">
                        <div className="w-6 h-6 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xl text-zinc-700 font-semibold">Generating your icon set...</p>
                    </div>
                    <p className="mt-2 text-zinc-500">This might take a moment. Good things are worth the wait!</p>
                </div>
                <div className="mt-8 opacity-60 space-y-12">
                    <div>
                        <SectionTitle>Standard Icons</SectionTitle>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
                        <div>
                            <SectionTitle>Favicon</SectionTitle>
                            <div className="max-w-xs mx-auto"><SkeletonCard /></div>
                        </div>
                        <div>
                            <SectionTitle>Splash Screen</SectionTitle>
                            <SkeletonCard className="aspect-[9/16] max-w-xs mx-auto" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle>Android Adaptive Icon</SectionTitle>
                        <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto"><SkeletonCard /><SkeletonCard /></div>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto p-4 mb-4 text-center bg-red-100 border border-red-200 text-red-700 rounded-md">
                <strong>Error:</strong> {error}
            </div>
        );
    }

    if (icons) {
        const currentItem = selectedHistoryId ? history.find(item => item.id === selectedHistoryId) : history[0];
        const currentPrompt = currentItem?.prompt || 'icon-set';

        return (
            <div className="space-y-12 md:space-y-16">
                 <section className="text-center">
                    <DownloadAllButton icons={icons} prompt={currentPrompt} onError={setError} />
                </section>
                <section>
                    <SectionTitle>Standard Icons</SectionTitle>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                        {icons.standard.map((icon, index) => (
                            <IconCard key={index} icon={icon} filename={`icongenius-standard-${index + 1}.png`} />
                        ))}
                    </div>
                </section>
                
                <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-start max-w-5xl mx-auto">
                    <section className="flex flex-col">
                        <SectionTitle>Favicon</SectionTitle>
                        <div className="max-w-xs mx-auto">
                          <IconCard icon={icons.favicon} filename="icongenius-favicon.png" />
                        </div>
                    </section>
                    <section className="flex flex-col">
                        <SectionTitle>Splash Screen Preview</SectionTitle>
                        <div className="aspect-[9/16] max-w-xs mx-auto">
                            <SplashScreenPreview icon={icons.splash} />
                        </div>
                    </section>
                </div>

                <section>
                    <SectionTitle>Android Adaptive Icon</SectionTitle>
                    <AdaptiveIconPreview icons={[icons.adaptive.foreground, icons.adaptive.background]} />
                </section>
            </div>
        );
    }

    return (
        <div className="text-center text-zinc-500 mt-16 max-w-md mx-auto">
            <div className="w-24 h-24 bg-zinc-100/50 border-2 border-dashed border-zinc-300 rounded-3xl flex items-center justify-center mx-auto">
                <SparklesIcon className="w-10 h-10 text-zinc-400"/>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-zinc-600">Your full icon set awaits</h3>
            <p className="mt-1">
                Use the form below to generate a favicon, standard icons, an adaptive icon, and a splash screen from a single prompt.
            </p>
        </div>
    );
};

  return (
    <div className="min-h-screen text-zinc-900 font-sans relative overflow-x-hidden md:flex">
        {isHistoryVisible && (
            <div
                className="fixed inset-0 bg-black/50 z-20 md:hidden"
                onClick={() => setIsHistoryVisible(false)}
                aria-hidden="true"
            />
        )}
        
        <div className={`fixed inset-y-0 left-0 z-30 w-full max-w-sm transform transition-transform duration-300 ease-in-out ${isHistoryVisible ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-80 md:flex-shrink-0`}>
            <HistorySidebar
                history={history}
                onSelect={handleSelectHistoryWithClose}
                onClear={handleClearHistoryWithClose}
                selectedId={selectedHistoryId}
                onClose={() => setIsHistoryVisible(false)}
            />
        </div>
        
        <div className="flex flex-col min-w-0 flex-grow">
            <main className="flex-grow container mx-auto px-4 pt-8 pb-40 md:py-8 flex flex-col">
                <Header />
                <div className="flex-grow mt-8">
                    {renderContent()}
                </div>
            </main>
            <PromptForm onSubmit={handleGenerate} isLoading={isLoading} />
        </div>
        
        <button
          onClick={() => setIsHistoryVisible(true)}
          className="md:hidden fixed bottom-52 sm:bottom-24 left-4 z-20 flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500 transition-all transform hover:scale-110"
          aria-label="Open history panel"
        >
          <HistoryIcon className="w-7 h-7 text-zinc-700" />
        </button>
    </div>
  );
};

export default App;
