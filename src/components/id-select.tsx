// 解决select选择框 写入的是number类型，输出的是string类型
import { Select } from "antd";
// 获取Select身上的所有类型
type SelectProps = React.ComponentProps<typeof Select>;

// onChange的时候都会把值转化为number类型
interface IdSelectProps
  extends Omit<SelectProps, "options" | "value" | "onChange"> {
  value: string | number | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: string }[];
}
// value可以传递多种类型的值
// onChange只会回调 number|undefined类型
// 当isNaN（Number(value)）为true时，代表选择默认类型 例如 '23gf'
// 当选择默认类型的时候，onChange会回调undefined
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      {...restProps}
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
