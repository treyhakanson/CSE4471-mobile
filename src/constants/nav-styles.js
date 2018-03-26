import colors from "./colors";

const navStyles = {
   // dimensions
   buttonMargin: 12,
   buttonSize: 24,

   // full styles
   primary: {
      headerStyle: {
         backgroundColor: colors.primary.default,
         borderBottomColor: "transparent"
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
         fontSize: 24
      }
   }
};

export default navStyles;
