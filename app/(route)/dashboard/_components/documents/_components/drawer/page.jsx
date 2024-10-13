"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";

export function FileTypeDrawer({ drawerTrigger }) {
  const [fileType, setFileType] = useState("text");
  const router = useRouter();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {drawerTrigger}
        {/* <Button variant="outline">Select File Type</Button> */}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Choose File Type</DrawerTitle>
            <DrawerDescription>
              Select the type of file you want to create.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <RadioGroup
              value={fileType}
              onValueChange={setFileType}
              className="gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text">Text (.docx)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="spreadsheet" id="spreadsheet" />
                <Label htmlFor="spreadsheet">Spreadsheet (.xlsx)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PDF" id="pdf" />
                <Label htmlFor="pdf">PDF (.pdf)</Label>
              </div>
            </RadioGroup>
          </div>
          <DrawerFooter>
            <Button
              onClick={() => {
                if (fileType === "text") {
                  router.push("/docs/create/text");
                } else if (fileType === "spreadsheet") {
                  router.push("/docs/create/sheet");
                } else {
                  router.push("/docs/create/pdf");
                }
              }}
            >
              Create {fileType.charAt(0).toUpperCase() + fileType.slice(1)} File
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
