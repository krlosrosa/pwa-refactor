import type { AnomalyFormData } from "./hooks/useAnomalia";

export default function validateFieldAnomalia(field: string, data: AnomalyFormData): boolean {
  switch (field) {
    case 'natureza':
      if(!data?.natureza || data.natureza === '') return false;
      if(!data.causaAvaria || data.causaAvaria === '') return false;
      if(!data.tipoNaoConformidade || data.tipoNaoConformidade === '') return false;
      return true;
    case 'quantidade':
      if((!data?.quantityBox && !data?.quantityUnit) && (Number(data?.quantityBox) === 0 || Number(data?.quantityUnit) === 0)) return false;
      return true;
    default:
      return true;
  }
}