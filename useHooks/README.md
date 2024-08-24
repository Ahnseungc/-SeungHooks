# SeungChan's useHook

## Available Scripts

### `useFunnel`

```
const [Funnel, setStep] = useFunnel(['clause', 'phone', 'auth-code', 'car-number', 'select-info', 'pin'] as const,
'clause',
);
```

```
<Funnel>
            <Funnel.Step name="clause">
                <Clause
                    onEnter={}
                    onBack={goHome}
                    onNext={({hasAgreedMarketing, hasAgreedTerms}: IClauseCheck) => {
                        setRegisterData((prev) => ({
                            ...prev,
                            hasAgreedMarketing,
                            hasAgreedTerms,
                        }));
                        setStep('phone');
                    }}
                />
            </Funnel.Step>
            <Funnel.Step name="phone">
                <SignUpPhone
                    onEnter={}
                    onBack={() => setStep('clause')}
                    onNext={async (phone) => {
                        ...
                        setStep("auth-code")
                    }}
                />
            </Funnel.Step>
            <Funnel.Step name="auth-code">
                <AuthCode
                    onEnter={}
                    onBack={() => domNavigate(-1)}
                    onNext={async (authCode) => {
                        ...
                        setStep("pin")
                    }}
                />
            </Funnel.Step>
            <Funnel.Step name="pin">
                <SignUpPin
                    onNext={async (pin) => {
                        ...
                    }}
                />
            </Funnel.Step>
        </Funnel>
```

### `usePrevious`

```
const prevOne = usePrevious(one);

useEffect(() => {
if(prevOne !== one){
...
...
}
}, [ one, two, three, four ]);
```
