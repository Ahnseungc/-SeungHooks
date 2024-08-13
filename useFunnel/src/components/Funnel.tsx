import { Children } from "react";
import { isValidElement } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { ReactNode } from "react";
import { ReactElement } from "react";
import { useSearchParams } from "react-router-dom";

interface FunnelProps<T extends readonly string[]> {
  steps: T;
  step: T[number];
  children: Array<ReactElement<StepProps<T>>> | ReactElement<StepProps<T>>;
}

interface StepProps<T extends readonly string[]> {
  name: T[number];
  children?: ReactNode;
}

const Funnel = <T extends readonly string[]>({
  steps,
  step,
  children,
}: FunnelProps<T>) => {
  const validChildren = Children.toArray(children)
    .filter(isValidElement)
    .filter((i) =>
      steps.includes((i.props as Partial<StepProps<T>>).name ?? "")
    ) as Array<ReactElement<StepProps<T>>>;

  const targetStep = validChildren.find((child) => child.props.name === step);

  return <>{targetStep || null}</>;
};

const Step = <T extends readonly string[]>({ children }: StepProps<T>) => {
  return <>{children}</>;
};

export const useFunnel = <T extends readonly string[]>(
  steps: T,
  defaultStep: T[number]
) => {
  const [params, setParams] = useSearchParams();
  const setStep = useCallback((step: T[number]) => setParams({ step }), []);

  const FunnelComponent = useMemo(() => {
    return Object.assign((props: Omit<FunnelProps<T>, "step" | "steps">) => {
      const step = params.get("step") ?? defaultStep;
      return <Funnel<T> steps={steps} step={step} {...props} />;
    });
  }, [params]);

  return [FunnelComponent, setStep] as const;
};
