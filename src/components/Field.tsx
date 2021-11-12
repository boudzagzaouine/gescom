import { Input } from "components/Input";
import type { FieldProps, PolymorphicRef, FieldValues } from "components/types";
import { useTranslation } from "hooks/translate";
import { useController } from "hooks/form";
import { forwardRef } from "react";

//TODO validation avec typescript du nom du champ `name`
export const Field = forwardRef(
  <
    C extends React.ElementType = "input",
    TValues extends FieldValues = FieldValues
  >(
    props: FieldProps<C, TValues>,
    ref?: PolymorphicRef<C>
  ) => {
    const { t } = useTranslation("common");
    const { field, fieldState, formState } = useController(props);
    let error = undefined;
    if (fieldState.error) {
      error =
        fieldState.error.message ||
        (fieldState.error.type === "required"
          ? t("field-required")
          : t("field-invalid"));
    }
    const meta = {
      touched: formState.isSubmitted || fieldState.isTouched,
      error,
      invalid: fieldState.invalid,
    };
    return <Input {...props} {...field} meta={meta} ref={ref} />;
  }
);