module Jekyll
  class UnderlineConverter < Converter
    safe true
    priority :low

    def matches(ext)
      ext =~ /^\.md$/i
    end

    def output_ext(ext)
      ".html"
    end

    def convert(content)
      # Convert ==text== to <span class="emphasis-underline">text</span>
      content.gsub(/==([^=]+)==/) do |match|
        text = $1
        "<span class=\"emphasis-underline\">#{text}</span>"
      end
    end
  end
end
