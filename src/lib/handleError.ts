// hooks/use-handle-axios-error.ts
import { useToast } from "@/hooks/use-toast";

export const useHandleAxiosError = () => {
  const { toast } = useToast();

  return (error: any) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors ||
      error?.response?.data?.error ||
      "Unknown error occurred.";

    if (error.response) {
      switch (error.response.status) {
        case 400:
          toast({
            title: "Bad Request",
            description: message,
            variant: "destructive",
          });
          break;
        case 401:
          toast({
            title: "Unauthorized",
            description: message,
            variant: "destructive",
          });
          break;
        case 403:
          toast({
            title: "Forbidden",
            description: message,
            variant: "destructive",
          });
          break;
        case 404:
          toast({
            title: "Not Found",
            description: message,
            variant: "destructive",
          });
          break;
        case 500:
          toast({
            title: "Internal Server Error",
            description: message,
            variant: "destructive",
          });
          break;
        default:
          toast({
            title: "Error",
            description: message,
            variant: "destructive",
          });
      }
    } else if (error.request) {
      toast({
        title: "Network Error",
        description: "No response received from the server.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Unexpected Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };
};
