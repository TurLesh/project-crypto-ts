import { useState, useCallback } from 'react';

const TestPage = () => {
    const [testState1, setTestState1] = useState('');

    const [resultState, setResultState] = useState<string[]>([]);

    const testBtnHandler = () => {
        setTestState1('state1 changed');
        funcCallback();
    };

    const funcCallback = useCallback(() => {
        const someConst = testFuncWithState(testState1);
        setResultState(someConst);
    }, [testState1]);

    // const funcCallback = () => {
    //     const someConst = testFuncWithState(testState1);
    //     setResultState(someConst);
    // };

    const testFuncWithState = (state: string) => {
        const splitedStr = state.split('');
        console.log('splited str: ', splitedStr);
        return splitedStr;
    };

    console.log('first state: ', testState1);

    return (
        <div>
            <button onClick={testBtnHandler}>click</button>
            <div>Result state: {resultState}</div>
        </div>
    );
};

export default TestPage;
