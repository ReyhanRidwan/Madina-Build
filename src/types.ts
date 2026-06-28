export interface SurveyData {
  nama: string;
  whatsapp: string;
  kota: string;
  jenisBangunan: string;
  luasBangunan: string;
  budget: string;
  targetPembangunan: string;
  fotoLahan: File | null;
  fotoLahanName?: string;
  catatan: string;
}

export interface RoomRABState {
  wallA: number;
  wallB: number;
  wallC: number;
  wallD: number;
  plafondHeight: number;
}

export interface MEPRABState {
  // Step 1: Dimensi Ruangan
  panjang: number;
  lebar: number;
  tinggiPlafond: number;

  // Step 2: Arsitektur & Dinding
  plesterChecked: boolean;
  plesterPrice: number; // slider
  catChecked: boolean;
  catPrice: number; // slider
  keramikChecked: boolean;
  keramikPrice: number; // slider

  // Step 3: Bongkaran & Pintu
  pintuCount: number;
  pintuLebar: number;
  pintuTinggi: number;
  pintuCatType: 'Melamik' | 'Duco';
  bongkarChecked: boolean;
  bongkarPrice: number; // slider
  catKusenChecked: boolean;
  catKusenPrice: number; // slider

  // Step 4: MEP
  lampuChecked: boolean;
  lampuCount: number;
  lampuSize: '3 Inch' | '4 Inch' | '5 Inch';
  lampuPrice: number; // slider
  saklarChecked: boolean;
  saklarCount: number;
  saklarPrice: number; // slider
  exhaustChecked: boolean;
  exhaustCount: number;
  exhaustPrice: number; // slider
  instalasiChecked: boolean;
  instalasiCount: number;
  instalasiPrice: number; // slider
}
