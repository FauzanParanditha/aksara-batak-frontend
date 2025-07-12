"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as React from "react";

type ConfirmOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
};

type ConfirmContextType = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const ConfirmDialogContext = React.createContext<
  ConfirmContextType | undefined
>(undefined);

export const ConfirmDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [options, setOptions] = React.useState<ConfirmOptions>({});
  const resolver = React.useRef<((val: boolean) => void) | undefined>(
    undefined
  );

  const confirm = (opts: ConfirmOptions) => {
    setOptions(opts);
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  };

  const handleConfirm = () => {
    resolver.current?.(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    resolver.current?.(false);
    setIsOpen(false);
  };

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}

      <AlertDialog.Root open={isOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <AlertDialog.Content className="fixed top-[50%] left-[50%] max-w-md w-full bg-white p-6 rounded-xl -translate-x-1/2 -translate-y-1/2 shadow-xl">
            <AlertDialog.Title className="text-lg font-bold">
              {options.title || "Konfirmasi"}
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-gray-600">
              {options.description || "Apakah Anda yakin?"}
            </AlertDialog.Description>
            <div className="mt-4 flex justify-end gap-2">
              <AlertDialog.Cancel asChild>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  {options.cancelText || "Batal"}
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  {options.confirmText || "Ya"}
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </ConfirmDialogContext.Provider>
  );
};

export const useConfirmDialog = () => {
  const context = React.useContext(ConfirmDialogContext);
  if (!context)
    throw new Error(
      "useConfirmDialog must be used within ConfirmDialogProvider"
    );
  return context.confirm;
};
