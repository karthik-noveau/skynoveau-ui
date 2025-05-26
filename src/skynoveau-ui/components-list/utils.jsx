import { useState } from "react";

export const OnClickComponent = ({ target, ModelRenderer }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>{target}</div>

      {open && <ModelRenderer open={open} close={() => setOpen(false)} />}
    </>
  );
};

export const HamburgerOnClick = ({ open, setOpen }) => {
  
}