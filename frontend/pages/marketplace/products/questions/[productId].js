import React, { useState, useEffect, useContext } from "react";
import {
  MdArrowBack,
} from "react-icons/md";
import { AiOutlineComment, AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { Card, CardBody, Avatar} from '@windmill/react-ui'
import Button from '@/components/Buttons/Button'
import Layout from '@/containers/Layout'
import { useDispatch, useSelector } from "react-redux";
import { SwiperSlide, Swiper } from 'swiper/react'
import { getQuestionsByProduct, createQuestion, QuestionUpvote, QuestionDownvote, createAnswer } from '@/redux/actions/questionAction'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import { SignInContext } from '@/context/SignInContext'
import SectionTitle from '@/components/Typography/SectionTitle'
import { Input, Label } from '@windmill/react-ui'
import PopUp from '@/marketplace/components/pop/PopUp'
import SignInPop from '@/marketplace/components/auth/SignInPop'


const Questions = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const questions = useSelector((state) => state.questions.questions);
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [ question, setQuestion ] = useState("")
    const [ answers, setAnswers ] = useState(false)
    const [answer, setAnswer ] = useState("")
    const [ isOpen, setIsOpen] = useState(false)
    const [ isOpen1, setIsOpen1] = useState(false)
    const [ singleQuestion, setSingleQuestion ] = useState(false)
    const [ up, setUp ] = useState(false)
    const [ isAnswered, setIsAnswered ] = useState(false)
    const [isOpenAnswer, setIsOpenAnswer ] = useState(false)

    const { productId } = router.query;

     useEffect(() => {
        if(productId){
           dispatch(getQuestionsByProduct(productId))
        }
    }, [ dispatch, productId ])

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const { OpenSign, closeSidebar, toggleSidebar } = useContext(SignInContext)


   const clickSubmit = (event) => {
    if (!isAuthenticated) { 
        toggleSidebar()
     } else {
    event.preventDefault();
        const questionData = {
        question: question,
        productId: productId,
        author: {
            id: user._id,
            name: user.name,
            avatar: user.avatar
            },
        };
        dispatch(createQuestion(productId, questionData));
        setTimeout(() => {
            dispatch(getQuestionsByProduct(productId))
        } , 1000)
    }
    setQuestion("")
  };

    const handleSendAnswer = (question) => {
      const answerData = {
          answer: answer,
      };
      dispatch(createAnswer(question, answerData))
      setAnswer("")
      setIsAnswered(true)
       setTimeout(() => {
            dispatch(getQuestionsByProduct(productId))
        } , 1000)
    }



  const answerHandler = (question) => {
    setAnswers(question.answers)
    setSingleQuestion(question)
    }

    const handleUpvote = (question) => {
        dispatch(QuestionUpvote(question))
        setUp(true)
    }
    const handleDownvote = (question) => {
        dispatch(QuestionDownvote(question))
        setUp(true)
    }

    //Card to display questions  
    const QuestionCard = ({question}) => (     
           <Card className="max-w-md">
                <CardBody>
                    <div className="flex">
                        <Avatar size="large" src= {question.author.avatar} alt= {question.author.name } />
                        <div className="ml-2">
                            <p className="font-bold"> {question.author.name} </p>
                        </div>
                    </div>
                    <p className="my-2 font-bold ">
                        {question.question}
                    </p>
                    <div className="flex justify-between">
                        <div className="flex border-box p-2 my-auto"  onClick ={ () => answerHandler(question)}>
                            <div>
                                <AiOutlineComment className="my-auto text-lg mr-1" />
                            </div>
                            <div className="text-sm">
                                {question.answers.length}
                            </div>
                        </div>
                        <div className="flex border-box p-1">
                            <button onClick={() => handleDownvote(question.id)}>
                                <AiOutlineArrowDown className="my-auto"/>
                            </button>
                            <p className="my-auto text-sm mx-2">
                                {question.score}
                            </p>
                            <button onClick={() => handleUpvote(question.id)}>
                                <AiOutlineArrowUp  className="my-auto"/>
                            </button>
                        </div>
                    </div>
                </CardBody>
            </Card>
      )
    const AnswerCard = ({answer}) => (
            <Card className="max-w-md my-2">
                <CardBody>
                    <div className="flex justify-between">
                        <div className="flex">
                            <div
                                className="rounded-full p-1 relative"
                                // style={{background: "#62D2A2"}}
                                >
                                <a
                                    className="block bg-white p-1 rounded-full transform transition hover:-rotate-12 duration-300"
                                    href="#div"
                                >
                                    <img
                                    className="h-10 w-10 rounded-full"
                                    src= {answer.avatar}
                                    alt= {answer.name}
                                    />
                                </a>
                                {/* <div className="text-xs text-white bg-green-400 rounded-full p-1 absolute top-0 right-0 w-6 h-6 -mx-1" >
                                    <div className="mx-auto">
                                        97
                                    </div>
                                </div> */}
                            </div>
                            <div className="ml-2 my-auto">
                                <p className=" dark:text-gray-300"> {answer.name} </p>
                            </div>
                        </div>
                    </div>
                    <p className="my-2 text-Black text-lg text-center">
                        {answer.answer}
                    </p>
                    {/* <div className="flex justify-between relative h-6">
                        <div className="flex rounded-md border border-Grey-sd p-1 absolute right-2">
                            <AiOutlineArrowDown className="my-auto"/>
                            <p className="my-auto text-sm mx-2">
                                {answer.score}
                            </p>
                            <AiOutlineArrowUp  className="my-auto"/>
                        </div>
                    </div> */}
                </CardBody>
            </Card>
    )

    return (
        <Layout>
            <div className="lg:w-5/6 lg:mx-auto lg:my-24 mobile:my-6">
                <div className="p-2 my-3 relative">
                    <div className="relative h-10">
                        <div className=" absolute top-2 left-0 z-50">
                            <div className="flex">
                                <button
                                    className="rounded-full w-8 h-8 bg-Grey-light p-0 border-0 inline-flex items-center justify-center text-white"
                                    onClick={() => setTimeout(() => router.back(), 150)}>
                                    <MdArrowBack className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="my-3">
                        <SectionTitle> Post your question</SectionTitle>
                        
                        <div className=" border-box my-3"> 
                            <input 
                                    placeholder= "Type in your question"
                                    className="focus:outline-none focus:ring focus:border-blue-500 w-full rounded-[12px] p-3 "
                                    type="text" 
                                    value={question} 
                                    onChange={(event) => setQuestion(event.target.value)}
                            />
                        </div>
                        <div className="my-2">
                            <Button
                                className="bg-Blue text-white text-sm shadow-none"
                                onClick= {clickSubmit}
                            >
                                Post Question
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="my-4 p-4">
                    <div className="px-2"> 
                        <SectionTitle> Questions </SectionTitle>
                    </div>
                    {questions.length > 0 ?
                        <>
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={ isTabletOrMobile ? 1 : 5 }
                            freeMode={true}
                            >
                            {questions?.map(( question ) => (
                                <SwiperSlide className="mobile:w-3/4" key={question.name}>
                                    <QuestionCard question = { question } />
                                </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        </>
                        :
                        <div className="p-2"> No questions for this product </div>
                    }
                <div className="my-2 p-2">
                    <SectionTitle> Answers </SectionTitle>
                    { singleQuestion &&
                        <div className="mb-4">
                            <div className="font-bold text-lg">
                                Q: {singleQuestion.question}
                            </div>
                            <Button className="bg-Blue text-white shadow-none text-sm my-2" onClick={() =>  !isAuthenticated ? toggleSidebar() : setIsOpenAnswer(true)}>
                                Answer
                        </Button>
                        </div>
                    }               
                { answers.length > 0 ?
                    answers?.map((data, i)=> (  
                        <div key={i}>
                            < AnswerCard answer={data}/>
                        </div>
                    ))
                : "No answers found"
                }
                </div>
        
                <PopUp isOpen={isOpenAnswer} setIsOpen={setIsOpenAnswer} title="Answer the question">
                    <div className="p-2">
                        {singleQuestion && 
                            <div className= "font-bold text-lg">
                                {singleQuestion.question}
                            </div>    
                            }
                        <div className="my-3">
                            <input 
                                className="shadow appearance-none border rounded py-2 h-28 text-Black w-full focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent p-2"
                                value = {answer}
                                type = "text"
                                onChange = {(event) => setAnswer(event.target.value)}    
                            />
                        </div>
                    </div>
                    <div className="fixed bottom-0 border-t-2 border-Grey-border p-2 bg-white w-full">
                        <div className="grid px-2">
                            <Button className="bg-Black text-white" onClick ={() => handleSendAnswer(singleQuestion.id)}> Post answer </Button>
                        </div>
                    </div>
                </PopUp>

                </div>
            </div>
        </Layout>
    )
}

export default Questions
