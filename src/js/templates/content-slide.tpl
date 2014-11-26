<div class="content-slide-collection__content-container">
  <div class="article">
    <% if(typeof heading !== 'undefined') { %>
      <h2 class="article__heading"><%= heading %></h2>
    <% } %>
    <div class="article__body">
      <%= content %>
    </div>
  </div>
  <a class="continue-prompt" href="#">
    <span class="continue-prompt__icon"></span>
  </a>
</div>
