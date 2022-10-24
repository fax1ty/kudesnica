import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

type Props = BottomSheetBackdropProps & {
  disappearsOnIndex?: number;
  appearsOnIndex?: number;
};

export const CustomBackdrop = ({
  disappearsOnIndex,
  appearsOnIndex,
  ...props
}: Props) => (
  <BottomSheetBackdrop
    {...props}
    disappearsOnIndex={disappearsOnIndex}
    appearsOnIndex={appearsOnIndex}
    pressBehavior="close"
    style={{
      backgroundColor: "rgba(67, 44, 119, 0.5)",
      position: "absolute",
      width: "100%",
      height: "100%",
    }}
  />
);
