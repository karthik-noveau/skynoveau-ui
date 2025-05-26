import { create } from "zustand";

const initialState = {
  componentId: {},
  showFontSize: false,
  changeFontFamily: false,
};

export const useUiBuilderStore = create((setState) => ({
  ...initialState,
  setComponentId: (id) => {
    setState(() => {
      return { componentId: id };
    });
  },
  setShowFontSize: (data) => {
    setState((state) => {
      return { showFontSize: !state.showFontSize };
    });
  },
  setChangeFontFamily: (data) => {
    setState((state) => {
      return { changeFontFamily: !state.changeFontFamily };
    });
  },
}));
