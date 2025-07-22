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

  const close = (result: boolean) => {
    resolver.current?.(result);
    resolver.current = undefined;
    setIsOpen(false);
  };

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}

      <AlertDialog.Root
        open={isOpen}
        onOpenChange={(val) => !val && close(false)}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm animate-fade-in" />
          <AlertDialog.Content className="fixed z-50 top-[50%] left-[50%] w-full max-w-md max-h-[90vh] overflow-y-auto bg-white p-6 px-4 md:px-6 rounded-xl -translate-x-1/2 -translate-y-1/2 shadow-xl focus:outline-none animate-slide-in">
            <AlertDialog.Title className="text-lg md:text-xl font-bold">
              {options.title || "Confirmation"}
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-sm md:text-base text-gray-600">
              {options.description || "Are you sure you want to proceed?"}
            </AlertDialog.Description>
            <div className="mt-4 flex justify-end gap-2">
              <AlertDialog.Cancel asChild>
                <button
                  onClick={() => close(false)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {options.cancelText || "Cancel"}
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  onClick={() => close(true)}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  {options.confirmText || "Yes"}
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
