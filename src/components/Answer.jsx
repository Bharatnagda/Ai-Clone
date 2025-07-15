import { useEffect, useState } from "react"
import { checkHeading, replaceHeadingstar } from "../Helper";

const Answer = ({ ans, index, totalResult }) => {
      const [heading, setHeading] = useState(false);
      const [answer, setAnswer] = useState(ans)
      useEffect(() => {
            if (checkHeading(ans)) {
                  setHeading(true)
                  setAnswer(replaceHeadingstar(ans))
            }

      })

      return (
            <>
                  {
                        index == 0 && totalResult > 1 ? <span className="text-zinc-200 text-3xl font-extrabold uppercase">{answer}</span> :
                              heading ? <span className="text-zinc-200 font-bold block text-base">{answer}</span> :
                                    <span className="pt-5 text-zinc-200 text-base font-semibold">{answer}</span>
                  }
                  {

                  }
            </>
      )
}

export default Answer