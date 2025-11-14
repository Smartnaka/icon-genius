export type IconRole = 'foreground' | 'background';

export interface GeneratedIcon {
  src: string;
  prompt: string;
  role?: IconRole;
}

export interface GeneratedIconSet {
    favicon: GeneratedIcon;
    standard: GeneratedIcon[];
    adaptive: {
        foreground: GeneratedIcon;
        background: GeneratedIcon;
    };
    splash: GeneratedIcon;
}

export interface HistoryItem {
  id: string;
  prompt: string;
  style: string;
  icons: GeneratedIconSet;
  timestamp: number;
}
