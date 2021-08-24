# Hello world step by step

Here we will take the Hello world ! example and explain it line by line.

```cpp
#define VULKAN_COMPIL
#include "IkyrRenderEngineAPI.h"
```

- VULKAN_COMPIL indicate that you want to use Vulkan renderer (TODO is it still needed?)
- "IkyrRenderEngineAPI.h" is the main header that you have to include to use IRE, of course.

```cpp
#define IRE Ikyr::Renderer
```

This shortens the namespace Ikyr::Renderer into IRE for more readability. We'll use it for Ikyr Render Engine in this documentation too.

```cpp
IRE::System *system = new IRE::System();
system->init();
```

Every program using IRE have to create a system. This is the base to use the program. Always create only one system, even if you want to create multiple window/threads/contexts.

```cpp
IRE::ContextOptions contextOptions;
contextOptions.bufferingStrategy = IRE::BufferingStrategy::TRIPLE_BUFFERING;
contextOptions.displayMode = IRE::DisplayMode::MAILBOX;
IRE::Context *context = new IRE::Context(system, contextOptions);
```

Here we create our first [context](doc/context). A context will manage a group of windows that you want to be synchronized in the same thread.
If you want independant windows, you have to create a new context (see [multi-windows](doc/context)).
As we only have a single window here, we only need a single context.
We use two options here for this context that will impact all following declarations in this context:
- Triple buffering: The windows will have a triple buffer and objects you'll draw on it will have needed buffer tripled too.
- Mailbox: We indicate that we want to use mailbox mode (similar to vertical synchronization, but too fast programs can still update frames in queue)

```cpp
IRE::RenderWindowOptions options;
options.fullscreen = false;
options.createDepthStencilBuffer  = false;
IRE::RenderWindow *window = new IRE::RenderWindow(options, context, 1366, 768);
```

And now we can create our window ! We simply create it in windowed mode, with a size of 1366x768.
The interesting part here is the option **createDepthStencilBuffer**. This option will create a depth and stencil buffer along the window surface.
For 3D applications, it will be mandatory to draw triangles in the right order.
However, for 2D applications, you can choose between 3 ways for your z-ordering:
- Use a depth and stencil buffer, that will do the job automatically, at the cost of buffer and a buffer check at each draw. Use this method will allow the engine to run your draws asynchronously. To indicate which object must be above another, you have to indicate a [z-order](doc/z-order) on each object. You can either do it automatically (increment z axis on each draw call) or indicate them manually.
- Prevent the creation of a depth and stencil buffer will prevent to draw asynchronously, and so you'll have to draw your objects in the order you want the engine to draw them.

```cpp
IRE::Camera2D *camera = new IRE::Camera2D();
window->setCamera(camera);
camera->setClipping(glm::vec2(-10000.0f, 10000.0f));
camera->setPosition(glm::vec2(0.0f, 768.0f));
camera->setViewport(IRE::Viewport(0, 0, 100, 100, true));
camera->setScissor(IRE::Scissor(true));
```

OK

```cpp
IRE::Rectangle2D *object = new IRE::Rectangle2D(context, 30, 30, currentTexture, false);// IRE::Color::Color(246, 156, 67));
object->prepareFor(window);
object->setTexture(window, textures.at(textureIndex));
int posX = (objects.size() % 40) * 35 - 17;
int posY = std::floor(objects.size() / 40) * 35 + 17;
object->setPosition(glm::vec2(posX, posY));
object->setDepth(objects.size());
```
WE CREATE AN OBJECT

```cpp
bool mustStayOpen = true;

while (mustStayOpen) {
    ...
}
```

Our main loop that will draw each frame and manage user events.

```cpp
context->startFrame();
window->draw(object);
context->endFrame();
```

We start a new frame, draw our object, and end the frame.

```cpp
Ikyr::Renderer::ExternalEvent event;
while (window->pollEvent(event))
{
    if (event.type == Ikyr::Renderer::Events::CLOSE_WINDOW || event.type == IRE::Events::KEY_PRESSED)
    {
        if (event.keyCode == 0 || event.keyCode == IRE::Events::KEY_ESCAPE)
            mustStayOpen = false;
    }
}
```

We poll events from the window to detect any closing event and break the loop.

```cpp
window->waitAllFrames();
context->markForDelete(object);
delete window;
delete camera;
delete context;
delete system;
```

We delete all the stuff, in the same order than in their creation

```cpp
return 0;
```

Everything went fine ! It's time to take a break...
