# Hello World !

Here is some simple code you can use to test if your configuration is working.

```cpp
#define VULKAN_COMPIL
#include "IkyrRenderEngineAPI.h"

#define IRE Ikyr::Renderer

int main()
{
	IRE::System *system = new IRE::System();
    system->init();

    IRE::ContextOptions contextOptions;
    contextOptions.bufferingStrategy = IRE::BufferingStrategy::TRIPLE_BUFFERING;
    contextOptions.displayMode = IRE::DisplayMode::MAILBOX;
    IRE::Context *context = new IRE::Context(system, contextOptions);

    IRE::RenderWindowOptions options;
    options.fullscreen = false;
    options.createDepthStencilBuffer  = false;
    IRE::RenderWindow *window = new IRE::RenderWindow(options, context, 1366, 768);
    
    IRE::Camera2D *camera = new IRE::Camera2D();
    window->setCamera(camera);
    camera->setClipping(glm::vec2(-10000.0f, 10000.0f));
    camera->setPosition(glm::vec2(0.0f, 768.0f));
    camera->setViewport(IRE::Viewport(0, 0, 100, 100, true));
    camera->setScissor(IRE::Scissor(true));

    IRE::Rectangle2D *object = new IRE::Rectangle2D(context, 30, 30, currentTexture, false);// IRE::Color::Color(246, 156, 67));
    object->prepareFor(window);
    object->setTexture(window, textures.at(textureIndex));
    int posX = (objects.size() % 40) * 35 - 17;
    int posY = std::floor(objects.size() / 40) * 35 + 17;
    object->setPosition(glm::vec2(posX, posY));
    object->setDepth(objects.size());

    bool mustStayOpen = true;

    while (mustStayOpen) {
        context->startFrame();
        window->draw(object);
        context->endFrame();

        Ikyr::Renderer::ExternalEvent event;
        while (window->pollEvent(event))
        {
            if (event.type == Ikyr::Renderer::Events::CLOSE_WINDOW || event.type == IRE::Events::KEY_PRESSED)
            {
                if (event.keyCode == 0 || event.keyCode == IRE::Events::KEY_ESCAPE)
                    mustStayOpen = false;
            }
        }
    }

    window->waitAllFrames();
    context->markForDelete(object);
    delete window;
    delete camera;
    delete context;
    delete system;

    return 0;
}
```