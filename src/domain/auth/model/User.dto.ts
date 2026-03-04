export interface UserInfoDto {
  id: string;
  name: string;
  roles: string[];
  access_token: string;
  empresa?: string;
}