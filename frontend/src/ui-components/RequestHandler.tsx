import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RequestHandlerProps {
  onSubmit: () => Promise<void>;
  children: React.ReactNode;
  trigger: boolean;
}

const RequestHandler: React.FC<RequestHandlerProps> = ({
  onSubmit,
  children,
  trigger,
}) => {
  useEffect(() => {
    const handleRequest = async () => {
      try {
        await onSubmit();
        toast.success("Operación realizada con éxito.");
      } catch (error: any) {
        toast.error(error?.message || "Ocurrió un error en la operación.");
      }
    };

    if (trigger) {
      handleRequest();
    }
  }, [trigger]);

  return (
    <div>
      {children}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default RequestHandler;
