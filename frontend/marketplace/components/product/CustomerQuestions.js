import React, { useEffect, useState, memo } from 'react'
import Card from '@/components/Cards/Card'
import Button from '@/components/Buttons/Button'
import { useDispatch, useSelector } from 'react-redux'
import { MdChevronRight } from 'react-icons/md'
import { getQuestionsByProduct, createQuestion } from '@/redux/actions/questionAction'
import Link from 'next/link'

const CustomerQuestions = ({product, toggleSidebar}) => {
    const MAX_LENGTH = 80;
    const questions = useSelector((state) => state.questions.questions);
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [ question, setQuestion ] = useState("")
    const [ questionAsked, setQuestionAsked ] = useState(false)
    const [error, setError ] = useState(false) 

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getQuestionsByProduct(product?._id))
    }, [product, question, dispatch]) 

    const handleQuestion = (event) => {
        if (!isAuthenticated) { 
            toggleSidebar()
        } 
        else if (question.length < 10) {
           setError("The question is not long enough") 
        } else{
        event.preventDefault();
            const questionData = {
            question: question,
            productId: product._ID,
            author: {
                id: user._id,
                name: user.name,
                avatar: user.avatar
                },
            };
            dispatch(createQuestion(product._id, questionData));
            setError(false )
            setQuestion("")
            setQuestionAsked(true)
        }
  };

  const handleChange = (e) => {
      setQuestion(e.target.value)
  }

    return (
        <Card title="Customer Questions">
            <div className="mb-4">
                <div className="m-auto text-center">
                    <span className="font-bold text-center"> Have a question for {product.name}? </span>
                </div>
                <div className="mx-auto my-3">
                    <div className="max-w-md mx-auto">
                        <div className="border-box my-2">
                            <input 
                                    className="focus:outline-none focus:ring focus:border-blue-500 w-full rounded-[12px] p-3 "
                                    value={question} 
                                    onChange={handleChange} 
                                    placeholder="Type your question here"
                            />
                        </div>
                    { error && 
                        <div className="my-2 text-red-500"> { error } </div>
                    }
                    <Button className="bg-Blue text-white my-1"
                            onClick= {handleQuestion}
                    >
                                Send question
                    </Button>
                    </div>
                </div>
            </div>
             { questions.filter(obj => obj.is_answered === true).length !== 0 ?
                <>
                    <div className="p-2 border-Grey-border border solid rounded-md bg-white">

                        {questions.filter(obj => obj.is_answered === true).slice(0, 7).map( ({question, answers}) => (
                    <div className="my-2">
                            <div className="font-bold text-base my-2">  
                                Q: {question}
                            </div>
                            <div className="flex italic">
                            <span className="font-bold italic">A: </span> {`${answers[0] !== undefined ? answers[0]?.answer.substring(0, MAX_LENGTH) : "" }...`}
                            </div>
                        </div>
                            ))}
                    </div>
                    <Link href = {`/marketplace/products/questions/${product._id}`} >
                        <div className="flex space-between my-3">
                            <h1 className="ml-2">  See All {questions.filter(obj => obj.is_answered === true).length} answered questions </h1>
                            <MdChevronRight className="text-2xl"/>
                        </div>
                    </Link>
                </>
                :
                <Link href = {`/marketplace/products/questions/${product._id}`} >
                    <div className="flex space-between my-3 cursor-pointer">
                        <h1 className="ml-2">  See All Questions </h1>
                        <MdChevronRight className="text-2xl"/>
                    </div>
                </Link>
            }
        </Card>
    )
}

export default memo(CustomerQuestions)
