export interface MemberPosition {
  text1?: string;
  text2?: string;
}

export interface Member {
  name: string;
  dateofbirth: string;
  nationality: string;
  position?: MemberPosition;
}

export type MembersByKey = Record<string, Member>;

export interface MemberWithImage extends Member {
  id: string;
  imageSrc: string;
}
