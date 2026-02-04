export function priorityToString(k: number): string{
  switch (k){
    case 1:
      return "LOW";
    case 2:
      return "MEDIUM";
    case 3:
      return "HIGH";
    case 4:
      return "HIGHEST";
    default:
      return "None";
  }
}

export function requestTypeToString(k: number): string{
  switch (k){
    case 0:
      return "Hardware Repairs & Configuration";
    case 1:
      return "Network/Internet Services";
    case 2:
      return "Data Services";
    case 3:
      return "System Services";
    case 4:
      return "Request for System Development";
    default:
      return "Others";
  }
}
