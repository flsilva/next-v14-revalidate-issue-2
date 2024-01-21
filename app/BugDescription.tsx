export default function BugDescription() {
  return (
    <div>
      <p className="mt-4">
        This bug report is using{" "}
        <span className="font-mono font-semibold">
          Next.js v14.1.1-canary.4
        </span>
      </p>
      <p className="mt-4">
        <span className="text-2xl">Short description</span>
        <br />
        <br />
        Calling{" "}
        <span className="font-mono font-semibold">
          revalidatePath()
        </span> or{" "}
        <span className="font-mono font-semibold">revalidateTag()</span> in
        Server Actions that are triggered from Intercepting Routes breaks{" "}
        routing. Below I describe how to reproduce{" "}
        <span className="font-mono font-semibold">two bugs</span> in this app.
      </p>
      <p className="mt-8">
        <span className="text-2xl">This app has 2 routes and 3 pages</span>
        <br />
        <br />
        1. Route <span className="font-mono font-semibold">/</span> renders the
        file at{" "}
        <span className="font-mono font-semibold">src/app/page.tsx</span>.
        <br />
        <br />
        2. Route <span className="font-mono font-semibold">/foo</span> renders
        the file at{" "}
        <span className="font-mono font-semibold">
          /src/app/@intercept/(.)foo/page.tsx
        </span>{" "}
        when you navigate to it using the{" "}
        <span className="py-[1px] px-2 border-solid border-2 border-sky-600 text-sky-600">
          Nav to /foo
        </span>{" "}
        <span className="font-mono font-semibold">{"<Link>"}</span> below, and
        it renders the file at{" "}
        <span className="font-mono font-semibold">/src/app/foo/page.tsx</span>{" "}
        if you refresh the browser while visiting it.
      </p>
      <p className="mt-8">
        <span className="text-2xl">Steps to reproduce bugs #1 and #2</span>
        <br />
        <br />
        1. Make sure you&apos;re visiting the root route{" "}
        <span className="font-mono font-semibold">/</span>.
        <br />
        <br />
        2. Fill in the <span className="font-mono font-semibold">
          name
        </span>{" "}
        input text at{" "}
        <span className="font-mono font-semibold">
          Default @children slot box
        </span>
        .
        <br />
        <br />
        3. Click the <span className="font-mono font-semibold">
          Submit
        </span>{" "}
        button below the input field.
        <br />
        <br />
        4. It works as expected. The{" "}
        <span className="font-mono font-semibold">Submit</span> button changes
        to <span className="font-mono font-semibold">Submitting...</span> and
        after 3 seconds it changes back to{" "}
        <span className="font-mono font-semibold">Submit</span>, and we can see
        the Server Action&apos;s response.
        <br />
        <br />
        5. Click{" "}
        <span className="py-[1px] px-2 border-solid border-2 border-sky-600 text-sky-600">
          Nav to /foo
        </span>{" "}
        to visit the Intercepting Route{" "}
        <span className="font-mono font-semibold">/foo</span>. Navigating to it
        works as expected, i.e., you'll see{" "}
        <span className="font-mono font-semibold">
          /src/app/@intercept/(.)foo/page.tsx
        </span>{" "}
        content at the{" "}
        <span className="font-mono font-semibold">@intercept slot box</span>
        .
        <br />
        <br />
        6. Fill in the <span className="font-mono font-semibold">
          name
        </span>{" "}
        input text in the form at{" "}
        <span className="font-mono font-semibold">@intercept slot box</span>.
        <br />
        <br />
        7. Click the <span className="font-mono font-semibold">
          Submit
        </span>{" "}
        button below the input text.
        <br />
        <br />
        8. The form submission works as expected, but we have a bug here. The
        content at{" "}
        <span className="font-mono font-semibold">
          Default @children slot box
        </span>{" "}
        goes away, but it shouldn't. This is{" "}
        <span className="font-mono font-semibold">bug #1</span>.
        <br />
        <br />
        9. Do it again (second time), i.e., fill in the{" "}
        <span className="font-mono font-semibold">name</span> input text in the
        form at{" "}
        <span className="font-mono font-semibold">@intercept slot box</span>,
        without refreshing the browser.{" "}
        <span className="font-mono font-semibold">It does work</span>.
        <br />
        <br />
        10. Do it again (third time), i.e., fill in the{" "}
        <span className="font-mono font-semibold">name</span> input text in the
        form at{" "}
        <span className="font-mono font-semibold">@intercept slot box</span>,
        without refreshing the browser.{" "}
        <span className="font-mono font-semibold">It does NOT work</span>.
        <br />
        <br />
        11. We have another bug. We get a behavior equivalent to a hard reload.
        The page at{" "}
        <span className="font-mono font-semibold">
          @intercept slot box
        </span>{" "}
        goes away, and{" "}
        <span className="font-mono font-semibold">/src/app/foo/page.tsx</span>{" "}
        is rendered at{" "}
        <span className="font-mono font-semibold">
          Default @children slot box
        </span>
        , exactly as if we did a manual hard reload. This is{" "}
        <span className="font-mono font-semibold">bug #2</span>.
      </p>
      <p className="mt-8">
        <span className="text-2xl">What&apos;s expected to happen</span>
        <br />
        <br />
        For <span className="font-mono font-semibold">bug #1</span>: The content
        at{" "}
        <span className="font-mono font-semibold">
          Default @children slot box
        </span>{" "}
        shouldn't go away.
        <br />
        <br />
        For <span className="font-mono font-semibold">bug #2</span>:
        <br />
        <br />
        a. The content at{" "}
        <span className="font-mono font-semibold">
          @intercept slot box
        </span>{" "}
        shouldn't go away.
        <br />
        b. The{" "}
        <span className="font-mono font-semibold">
          /src/app/foo/page.tsx
        </span>{" "}
        shouldn't get rendered at{" "}
        <span className="font-mono font-semibold">
          Default @children slot box
        </span>
        .
      </p>
      <p className="mt-8">
        <span className="text-2xl">
          Code changes that results in the same behavior
        </span>
        <br />
        <br />
        1. Changing{" "}
        <span className="font-mono font-semibold">
          revalidatePath({"'/'"})
        </span>{" "}
        to{" "}
        <span className="font-mono font-semibold">
          revalidatePath({"'/', 'page'"})
        </span>
        .
        <br />
        <br />
        2. Changing{" "}
        <span className="font-mono font-semibold">
          revalidatePath({"'/'"})
        </span>{" "}
        to{" "}
        <span className="font-mono font-semibold">
          revalidatePath({"'/', 'layout'"})
        </span>
        .
        <br />
        <br />
        3. Changing{" "}
        <span className="font-mono font-semibold">
          revalidatePath({"'/'"})
        </span>{" "}
        to{" "}
        <span className="font-mono font-semibold">
          revalidatePath({"'/foo'"})
        </span>
        .
        <br />
        <br />
        4. Changing{" "}
        <span className="font-mono font-semibold">
          revalidatePath({"'/'"})
        </span>{" "}
        to{" "}
        <span className="font-mono font-semibold">
          revalidatePath({"'/foo', 'page'"})
        </span>
        .
        <br />
        <br />
        5. Changing{" "}
        <span className="font-mono font-semibold">
          revalidatePath({"'/'"})
        </span>{" "}
        to{" "}
        <span className="font-mono font-semibold">
          revalidatePath({"'/foo', 'layout'"})
        </span>
        .
        <br />
        <br />
        6. Replacing{" "}
        <span className="font-mono font-semibold">
          revalidatePath()
        </span> with{" "}
        <span className="font-mono font-semibold">
          revalidateTag({"'anything'"})
        </span>
        .
      </p>
      <p className="mt-8">
        <span className="text-2xl">
          Code changes that results in the expected behavior
        </span>
        <br />
        <br />
        1. If we comment out the{" "}
        <span className="font-mono font-semibold">
          revalidatePath({"'/'"})
        </span>{" "}
        line of code in{" "}
        <span className="font-mono font-semibold">action.ts</span> everything
        works as expected{" "}
        <span className="font-semibold">
          because we&apos;re not relying on cached data in this app
        </span>
        , showing that the bug only happens when we use that function.
      </p>
    </div>
  );
}
