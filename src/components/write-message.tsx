"use client";

import React, {
  Dispatch,
  useEffect,
  useReducer,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ReactSketchCanvasRef,
  ReactSketchCanvas as SketchCanvas,
} from "react-sketch-canvas";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn, uploadImage } from "@/lib/utils";

const dialog = {
  title: "Write Message",
};

// Define the state type
type State = {
  open: boolean;
  isMobile: boolean;
  strokeWidth: number;
  strokeColor: string;
  eraseMode: boolean;
  showStrokeWidthPopup: boolean;
  dialogTitle: string;
};

// Define the initial state
const initialState = {
  open: false,
  isMobile: false,
  strokeWidth: 10, // Default stroke width
  strokeColor: "#000000", // Default stroke color
  eraseMode: false,
  showStrokeWidthPopup: false,
  dialogTitle: "Write Message",
};

// Define the action type
type Action =
  | { type: "SET_IS_MOBILE"; payload: boolean }
  | { type: "SET_STROKE_WIDTH"; payload: number }
  | { type: "SET_STROKE_COLOR"; payload: string }
  | { type: "TOGGLE_ERASE_MODE" }
  | { type: "SHOW_STROKE_WIDTH_POPUP"; payload: boolean }
  | { type: "SET_DIALOG_TITLE"; payload: string };

// Define the reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_IS_MOBILE":
      return { ...state, isMobile: action.payload };
    case "SET_STROKE_WIDTH":
      return { ...state, strokeWidth: action.payload };
    case "SET_STROKE_COLOR":
      return { ...state, strokeColor: action.payload };
    case "TOGGLE_ERASE_MODE":
      return { ...state, eraseMode: !state.eraseMode };
    case "SHOW_STROKE_WIDTH_POPUP":
      return { ...state, showStrokeWidthPopup: action.payload };
    case "SET_DIALOG_TITLE":
      return { ...state, dialogTitle: action.payload };
    default:
      return state;
  }
}

export function EditProfileButton({
}: {
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [open, setOpen] = useState(false);
  const canvasRef = useRef<ReactSketchCanvasRef>(null!);

 

  useEffect(() => {
    const checkMobile = () => {
      dispatch({ type: "SET_IS_MOBILE", payload: window.innerWidth < 768 });
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmit = async () => {
    setOpen(false);
    dispatch({ type: "SET_DIALOG_TITLE", payload: "Message Sent" });
  };

  return (
    <>
      {state.isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger
            disabled={state.dialogTitle === "Message Sent"}
            asChild
          >
              <span className="shiny-text">{state.dialogTitle}</span>
          </DrawerTrigger>
          <DrawerContent
          style={{
            padding: "clamp(0.5rem,1vw, 100rem)",
          }}
          className=" z-[9999] bg-black h-full border-0">
            <div className="mx-auto h-full w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="flex items-center gap-1 justify-between">
                  <CanvasControls
                    state={state}
                    dispatch={dispatch}
                    canvasRef={canvasRef}
                  />
                </DrawerTitle>
                <DrawerDescription />
              </DrawerHeader>
              <ProfileForm
                state={state}
                dispatch={dispatch}
                canvasRef={canvasRef}
                handleSubmit={handleSubmit}
                setOpen={setOpen}
              />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            disabled={state.dialogTitle === "Message Sent"}
            asChild
          >
            <span className=" leading-0">{state.dialogTitle}</span>
          </DialogTrigger>
          <DialogContent
          style={{
            padding: "clamp(0.5rem,1vw, 100rem)",
          }}
          className="sm:max-w-[425px]  border-0 z-[9999] bg-black">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-10 justify-between">
                <CanvasControls
                  state={state}
                  dispatch={dispatch}
                  canvasRef={canvasRef}
                />
              </DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <ProfileForm
              state={state}
              dispatch={dispatch}
              canvasRef={canvasRef}
              handleSubmit={handleSubmit}
            />
          </DialogContent>

        </Dialog>
        
      )}
      
    </>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import api, { third_api } from "@/lib/api";
import { Card, CardContent, CardFooter } from "./ui/card";
import OptimizedImage from "./OptimizedImage";

const CanvasControls = ({
  state,
  dispatch,
  canvasRef,
}: {
  state: State;
  dispatch: Dispatch<Action>;
  canvasRef: React.RefObject<ReactSketchCanvasRef>;
}) => {
  const [showTools, setShowTools] = useState(true);

  const toggleEraseMode = () => {
    dispatch({ type: "TOGGLE_ERASE_MODE" });
    canvasRef.current?.eraseMode(!state.eraseMode);
  };

  const toggleStrokeWidthPopup = () => {
    dispatch({
      type: "SHOW_STROKE_WIDTH_POPUP",
      payload: !state.showStrokeWidthPopup,
    });
  };

  const toolbarVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const popupVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <>
      <div className="relative z-[9999]">
        <AnimatePresence>
          {showTools ? (
            <motion.div
              className="flex items-center gap-3 relative  "
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.button
                className="p-1.5 hover:bg-neutral-700 rounded-lg"
                onClick={() => canvasRef.current?.undo()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Undo className="w-5 h-5 opacity-70" />
              </motion.button>

              <motion.button
                className="p-1.5 hover:bg-neutral-700 rounded-lg"
                onClick={() => canvasRef.current?.redo()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Redo className="w-5 h-5" />
              </motion.button>

              <motion.button
                className={`p-1.5 rounded-lg hover:bg-neutral-700 ${state.eraseMode ? "bg-neutral-600" : ""
                  }`}
                onClick={toggleEraseMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eraser
                  className={`w-5 h-5 ${state.eraseMode ? "opacity-100" : "opacity-70"
                    }`}
                />
              </motion.button>

              <motion.button
                className="p-1.5 hover:bg-neutral-700 rounded-lg"
                onClick={() => canvasRef.current?.clearCanvas()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Delete className="w-5 h-5" />
              </motion.button>

              <motion.div  className="relative">
                <motion.button
                  className="p-1.5 hover:bg-neutral-700 rounded-lg"
                  onClick={toggleStrokeWidthPopup}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StrokeWidth className="w-5 h-5 opacity-70" />
                </motion.button>

                <AnimatePresence>
                  {state.showStrokeWidthPopup && (
                    <motion.div
                      className="absolute top-12 left-0 bg-neutral-900 border rounded-xl p-4 w-32"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <Slider
                        min={1}
                        value={[state.strokeWidth]}
                        max={100}
                        className="w-full"
                        onValueChange={(value) =>
                          dispatch({
                            type: "SET_STROKE_WIDTH",
                            payload: value[0],
                          })
                        }
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ) : (
            <motion.p
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-lg font-medium"
            >
              {dialog.title}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <motion.button
        className="p-1.5 rounded-full hover:bg-neutral-700 -my-3"
        onClick={() => setShowTools(!showTools)}
        aria-label={showTools ? "Close tools" : "Show tools"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: showTools ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#ffffff"
          viewBox="0 0 256 256"
          className="opacity-70"
        >
          {showTools ? (
            <path d="M208.49,191.51a12,12,0,0,1-17,0L128,128l-63.51,63.51a12,12,0,0,1-17-17L111,111,47.51,47.51a12,12,0,0,1,17-17L128,97l63.51-63.51a12,12,0,0,1,17,17L145,111l63.51,63.51A12,12,0,0,1,208.49,191.51Z" />
          ) : (
            <path d="M232,32a8,8,0,0,0-8-8c-44.08,0-89.31,49.71-114.43,82.63A60,60,0,0,0,32,164c0,30.88-19.54,44.73-20.47,45.37A8,8,0,0,0,16,224H92a60,60,0,0,0,57.37-77.57C182.3,121.31,232,76.08,232,32ZM92,208H34.63C41.38,198.41,48,183.92,48,164a44,44,0,1,1,44,44Zm32.42-94.45q5.14-6.66,10.09-12.55A76.23,76.23,0,0,1,155,121.49q-5.9,4.94-12.55,10.09A60.54,60.54,0,0,0,124.42,113.55Zm42.7-2.68a92.57,92.57,0,0,0-22-22c31.78-34.53,55.75-45,69.9-47.91C212.17,55.12,201.65,79.09,167.12,110.87Z" />
          )}
        </svg>
      </motion.button>
    </>
  );
};




function ProfileForm({
  state,
  dispatch,
  canvasRef,
  handleSubmit,
  setOpen,
}: {
  state: State;
  dispatch: Dispatch<Action>;
  canvasRef: React.RefObject<ReactSketchCanvasRef>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = useState({
    message: "",
    name: "",
  });
  const [hasError, setHasError] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ip, setIp] = useState("");

 
useEffect(() => {
    fetch("/api/geo")
      .then((res) => res.json())
      .then((data) => {
        if (data.ip) {
          setIp(data.ip);
        }
      })
      .catch(() => { });
  }, []);
  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
        formData.message.length > 130 ||
        formData.message.trim().length === 0
      ) {
        setHasError(true);
        return;
      }
      setHasError(false);
      try {
        setLoading(true);
        const imageData = await canvasRef.current?.exportSvg();
        if (!imageData) return setErrorMessage("Failed to export image");
        const svgBlob = new Blob([imageData], {
          type: "image/svg+xml;charset=utf-8",
        });
        const svgFile = new File([svgBlob], "image.svg", {
          type: "image/svg+xml",
        });
        const upload_res = await uploadImage(svgFile);
        if (!upload_res.success) return setErrorMessage(upload_res.error);

        const payload = {
          ...formData,

          image: upload_res.data?.data.direct_url,
          del_image: upload_res.data?.data.deletion_url,
          ip: ip,
        };

        const response = await api.post("/messages", payload);
        if (response.success) {
          handleSubmit(e);
        }
        if (response.error) {
          fetch(upload_res.data?.data.deletion_url as string).catch(() => { });
          setErrorMessage(response.error);
        }
      } finally {
        setLoading(false);
      }
    },
    [formData, handleSubmit, canvasRef, ip]
  );

  const handleCanvasChange = useCallback(async () => {
    const paths = await canvasRef.current?.exportPaths();
    setIsCanvasEmpty(paths?.length === 0);
    if (state.showStrokeWidthPopup) {
      dispatch({ type: "SHOW_STROKE_WIDTH_POPUP", payload: false });
    }
  }, [canvasRef, state.showStrokeWidthPopup, dispatch]);

  const isFormInvalid = useMemo(
    () =>
      isCanvasEmpty ||
      formData.message.trim().length < 3 ||
      formData.name.trim().length === 0,
    [isCanvasEmpty, formData.message, formData.name]
  );

  const handleColorChange = (color: string) => {
    dispatch({ type: "SET_STROKE_COLOR", payload: color });
  };

  return (
    <div className="">
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-2 max-md:pb-3 max-md:px-4"
    >
      <div className="rounded-xl overflow-hidden"
      style={{
        paddingBottom: "clamp(0.5rem,0.5vw, 1rem)",
      }}
      >
        <SketchCanvas
          ref={canvasRef}
          onChange={handleCanvasChange}
          eraserWidth={state.strokeWidth}
          className="aspect-square"
          canvasColor="#f9fffa"
          strokeColor={state.strokeColor}
          strokeWidth={state.strokeWidth}
        />
      </div>
      <SimpleColorPicker onColorChange={handleColorChange} />
      <div className="">
        <Input
          required
          placeholder="Name"
          value={formData.name}
          style={{
            padding: "clamp(0.5rem,1vw, 1rem) clamp(0.5rem,1vw, 1rem)",
          }}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          className="ring-black  ring-0 border-black"
        />
      </div>
      <div>
        <Textarea
          required
          style={{
            padding: "clamp(0.5rem,1vw, 1rem) clamp(0.5rem,1vw, 1rem)",
          }}
          placeholder="Type your message here"
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (e.target.value.length <= 130) {
              setHasError(false);
            }
          }}
          className="ring-black ring-0 border-black"
        />
        <p className="text-xs text-red-500 mt-2 ml-0.5">{errorMessage}</p>
      </div>
      <div>
        <Button
          type="submit"
          className="w-full bg-white text-black"
          disabled={isFormInvalid || loading}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>
      <div>
        <Button
          onClick={() => setOpen?.(false)}
          type="button"
          variant={"outline"}
          className="w-full border-0 bg-white/15 md:hidden"
        >
          Close
        </Button>
      </div>
    </form>

    
              </div>
  );
}
interface SimpleColorPickerProps {
  onColorChange?: (color: string) => void;
}

function SimpleColorPicker({ onColorChange }: SimpleColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState("#000000");

  const colors = [
    "#000000",
    "#FF6B6B",
    "#4C6EF5",
    "#51CF66",
    "#FCC419",
    "#FF922B",
    "#BE4BDB",
    "#868E96",
    "#FA5252",
    "#E64980",
  ];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onColorChange?.(color);
  };

  return (
    <div className="p-3 rounded-lg bg-neutral-900 w-full inline-flex justify-evenly">
      {colors.map((color) => (
        <div
          key={color}
          onClick={() => handleColorSelect(color)}
          className={cn(
            "w-5 h-5 rounded-full transition-transform",

            selectedColor === color && "ring-2 ring-white ring-offset-zinc-900",
            color === "#FFFFFF" && "border border-zinc-700"
          )}
          style={{ backgroundColor: color }}
        >
          <span className="sr-only">Select color: {color}</span>
        </div>
      ))}
    </div>
  );
}

function Undo({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="#ffffff"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M232,144a64.07,64.07,0,0,1-64,64H80a8,8,0,0,1,0-16h88a48,48,0,0,0,0-96H51.31l34.35,34.34a8,8,0,0,1-11.32,11.32l-48-48a8,8,0,0,1,0-11.32l48-48A8,8,0,0,1,85.66,45.66L51.31,80H168A64.07,64.07,0,0,1,232,144Z"></path>
    </svg>
  );
}

function Redo({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="#ffffff"
      viewBox="0 0 256 256"
      {...props}
      className=" hover:cursor-pointer hover:opacity-100 opacity-70"
    >
      <path d="M170.34,130.34,204.69,96H88a48,48,0,0,0,0,96h88a8,8,0,0,1,0,16H88A64,64,0,0,1,88,80H204.69L170.34,45.66a8,8,0,0,1,11.32-11.32l48,48a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32-11.32Z"></path>
    </svg>
  );
}

function Eraser({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="#ffffff"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M225,80.4,183.6,39a24,24,0,0,0-33.94,0L31,157.66a24,24,0,0,0,0,33.94l30.06,30.06A8,8,0,0,0,66.74,224H216a8,8,0,0,0,0-16h-84.7L225,114.34A24,24,0,0,0,225,80.4ZM108.68,208H70.05L42.33,180.28a8,8,0,0,1,0-11.31L96,115.31,148.69,168Zm105-105L160,156.69,107.31,104,161,50.34a8,8,0,0,1,11.32,0l41.38,41.38a8,8,0,0,1,0,11.31Z"></path>
    </svg>
  );
}

function Delete({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="#ffffff"
      viewBox="0 0 256 256"
      {...props}
      className=" hover:cursor-pointer hover:opacity-100 opacity-70"
    >
      <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
    </svg>
  );
}

function StrokeWidth({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="1"></circle>
    </svg>
  );
}

