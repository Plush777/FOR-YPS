export interface Album {
  name: string;
  type: string;
  date: string;
}

export interface AlbumWithImage extends Album {
  id: string;
  imageSrc: string;
}

export type AlbumsByKey = Record<string, Album>;
