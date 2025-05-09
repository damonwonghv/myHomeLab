declare module '*.module.css';
declare module '*.module.less';

export type LinkType = {
    title: string;
    url: string;
    icon?: string;
    bgColor?: string;
    textColor?: string;
    subtitle?: string;
    more?: boolean;
};

export type Group = {
    title: string;
    icon?: string;
    color?: string;
};

export type Data = { group: Group; links: LinkType[] };

export type HomeLabData = {
    name: string;
    icon?: string;
    data: Data[];
};
